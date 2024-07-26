import { updateLabel } from "@/actions/auth.actions";
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
        const updatedData = await updateLabel(userAccount.$id, "patient");

        return this.login({ email, password });
      } else {
        return this.login({ email, password });
        return userAccount;
      }
    } catch (error: any) {
      if (error.type === "user_already_exists") {
        return this.login({ email, password });
      } else {
        throw error;
      }
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailPasswordSession(email, password);
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
