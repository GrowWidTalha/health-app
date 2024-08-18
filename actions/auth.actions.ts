"use server";

import { account, users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Query } from "appwrite";



/**
 * @description Update label of user
 * @returns update user with label
 */
export const updateLabel = async (userId: string, label: string) => {
  try {
    const user = await users.updateLabels(userId, [label]);

    return parseStringify(user);
  } catch (error) {
    console.log("Error updating label: ", error);
  }
};

export const getAllUsers = async () => {
  try {
    const allUsers = await users.list([ Query.orderDesc("$createdAt"), Query.contains("labels", ["patient"])])
    
    const data = {
      totalCount: allUsers.total,
      usersList: allUsers.users
    }

    return parseStringify(data)
  } catch (error) {
    console.log("Error getting all users: ", error)
  }
}