import { updateLabel } from "@/actions/auth.actions";
import { users } from "@/lib/appwrite.config";
import { Account, Client, ID } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

export const account = new Account(client);

interface CreateUserAccount {
  email: string;
  password: string;
  name: string;
}

interface LoginUserAccount {
  email: string;
  password: string;
}

/**
 * @description Auth class for client side
 * @returns all the auth for client side
 */

export class AppwriteService {
  //create a new record of user inside appwrite
 async createUserAccount({ email, password, name }: CreateUserAccount) {
  try {
    const userAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      await updateLabel(userAccount.$id, "patient");
      await this.login({ email, password });
      return await this.getCurrentUser();
    }
  } catch (error: any) {
    if (error.type === "user_already_exists") {
      throw new Error("User already exists. Please try logging in.");
    } else if (error.type === "password_invalid") {
      throw new Error("Invalid password. Please try again.");
    } else {
      throw new Error("An error occurred while creating the account.");
    }
  }
}

  async login({ email, password }: LoginUserAccount) {
    try {
      await account.createEmailPasswordSession(email, password);
      return this.getCurrentUser()
    } catch (error: any) {
      throw error;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser();
      return Boolean(data);
    } catch (error) {}

    return false;
  }

  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("getcurrentUser error: " + error);
    }

    return null;
  }

  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("logout error: " + error);
    }
  }
}

const appwriteService = new AppwriteService();

export default appwriteService;
