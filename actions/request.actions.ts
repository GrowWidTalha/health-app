"use server"
import {
  DATABASE_ID,
  databases,
  REQUEST_COLLECTION_ID,
} from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { CreateRequestParam } from "@/types";
import { ID } from "appwrite";
import { Query } from "node-appwrite";

export const createRequest = async ({
  appointment,
  reason,
  requestedBy,
  status,
  usertype,
  username,
}: CreateRequestParam) => {
  try {
    const request = await databases.createDocument(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      ID.unique(),
      {
        usertype: usertype,
        requestedBy: requestedBy,
        reason: reason,
        appointment: appointment,
        status: status,
        username: username
      }
    );

    return parseStringify(request);
  } catch (error) {
    console.log("Error creating request", error);
  }
};

export const getAllRequests = async () => {
  try {
    const requests = await databases.listDocuments(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      [Query.equal("status", ["pending"])]
    );

    return parseStringify(requests.documents);
  } catch (error) {
    console.log("", error);
  }
};

export const getRequestsById = async (requestId: string) => {
  try {
    const requests = await databases.getDocument(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      requestId
    );
    return parseStringify(requests);
  } catch (error) {
    console.log("", error);
  }
};

export const getRequestsUserId = async (userId: string) => {
  try {
    const requests = await databases.listDocuments(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      [Query.equal("requestedBy", userId)]
    );
    return parseStringify(requests.documents);
  } catch (error) {
    console.log("", error);
  }
};

export const updateRequest = async (requestId: string, requestData: any) => {
  try {
    const request = await databases.updateDocument(
      DATABASE_ID!,
      REQUEST_COLLECTION_ID!,
      requestId,
      {
        ...requestData,
      }
    );

    return parseStringify(request);
  } catch (error) {
    console.log("", error);
  }
};
