"use server";

import { account, users } from "@/lib/appwrite.config";


/**
 * @description Get Current user in server side
 * @returns returns current user in server
 */
export const getCurrentUser = async () => {
  try {
    const user = await account.get();

    return user;
  } catch (error) {
    console.log("error while getting current user: ", error);
  }
};

/**
 * @description Get isLoggedIn state in server side
 * @returns returns isLoggedIn state in server
 */
export const isLoggedIn = async () => {
  try {
    const user = await account.get();
    if (user.$id) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error while getting current user: ", error);
  }
};


/**
 * @description Update label of user
 * @returns update user with label
 */
export const updateLabel = async (userId: string, label: string) => {
  try {
    const user = await users.updateLabels(userId, [label])

    return user
  } catch (error) {
    console.log("Error updating label: ", error)
  }
}