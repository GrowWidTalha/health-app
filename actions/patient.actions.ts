"use server";

import { ID, Query } from "node-appwrite";

import { RegisterUserParams } from "@/types";
import {
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  databases,
  users
} from "../lib/appwrite.config";
import { parseStringify } from "../lib/utils";
import { updateLabel } from "./auth.actions";
import { uploadFile } from "./storage.actions";
import { revalidatePath } from "next/cache";


// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file = await uploadFile(identificationDocument)

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const updatedData = await updateLabel(patient.userId, "patient");
    // const updateNumber = await users.updatePhone(patient.userId, "+" + patient.phone)
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.fileId? file.fileId : null,
        identificationDocumentURL: file?.url,
        ...patient,
      }
    );
revalidatePath("/admin")
    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );
if(!patients.documents[0]) return null
    return parseStringify(patients.documents[0])
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
