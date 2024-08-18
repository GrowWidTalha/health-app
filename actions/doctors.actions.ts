"use server";

import {
  DATABASE_ID,
  databases,
  DOCTOR_COLLECTION_ID,
  users,
} from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { Query } from "appwrite";
import { uploadFile } from "./storage.actions";
import { updateLabel } from "./auth.actions";
import { parseStringify } from "@/lib/utils";
import { CreateDoctorParams } from "@/types";
import { Doctor } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createDoctor = async ({
  areaOfExpertise,
  avatar,
  email,
  name,
  phone,
}: CreateDoctorParams) => {
  try {
    const doctorUser = await users.create(
      ID.unique(),
      email,
      phone,
      phone,
      name
    );

    if (doctorUser) {
      await updateLabel(doctorUser.$id, "doctor");
      let file = await uploadFile(avatar);
      const document = await databases.createDocument(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        ID.unique(),
        {
          name: doctorUser.name,
          email: doctorUser.email,
          phone: doctorUser.phone,
          doctor_user_id: doctorUser.$id,
          areaOfExpertise: areaOfExpertise,
          avatar: file?.url,
        }
      );
      return document;
    }
  } catch (error) {
    console.log("Error while creating Doctor: ", error);
  }
};

export const getAllDoctors = async () => {
  try {
    const allUsers = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    return parseStringify(allUsers.documents);
  } catch (error) {}
};

export const getDoctorById = async (doctorId: string) => {
  try {
    const doc = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.equal("doctor_user_id", [doctorId])]
    );

    return parseStringify(doc.documents[0]);
  } catch (error) {
    console.log("error while getting doctor: ", error);
  }
};

interface UpdateDoctorProps {
  avatar: FormData | string | undefined;
  name: string;
  areaOfExpertise: string;
  email: string;
  phone: string;
}
export const updateDoctor = async (
  doctorId: string,
  doctor: UpdateDoctorProps
) => {
  try {
    let file;

    // Correctly check if doctor.avatar is an instance of FormData
    if (doctor.avatar instanceof FormData) {
      file = await uploadFile(doctor.avatar);
    }

    let updatedDoctor;

    // Update the document with the appropriate avatar URL
    if (file) {
      updatedDoctor = await databases.updateDocument(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        doctorId,
        {
          ...doctor,
          avatar: file.url, // Use file.url if a new file was uploaded
        }
      );
    } else {
      updatedDoctor = await databases.updateDocument(
        DATABASE_ID!,
        DOCTOR_COLLECTION_ID!,
        doctorId,
        {
          ...doctor,
          avatar: doctor.avatar, // Use the existing avatar if no file was uploaded
        }
      );
    }
    revalidatePath('/admin')
    return parseStringify(updatedDoctor);
  } catch (error) {
    console.error("Error while updating doctor:", error); // Log the actual error
  }
};

export const deleteDoctor = async (doctorId: string) => {
  try {
    const doctor = await databases.deleteDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      doctorId
    );

    return parseStringify(doctor);
  } catch (error) {
    console.log("error deleting the doctor: ", error)
  }
};
