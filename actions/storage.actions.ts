import { BUCKET_ID, ENDPOINT, NEXT_PUBLIC_PROJECT_ID, storage } from "@/lib/appwrite.config";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite";


export const uploadFile = async (fileData: FormData | undefined | string  
) => {
    try {
      if(typeof fileData === "string"){
        return
      }
        let file;
    if (fileData) {
      const inputFile =
        fileData &&
        InputFile.fromBlob(
          fileData?.get("blobFile") as Blob,
          fileData?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        let url = file?.$id
        ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${NEXT_PUBLIC_PROJECT_ID}`
        : null;
      return {
        url: url,
        fileId: file?.$id,
      }
    }
    } catch (error) {
        console.log("error while creating file")
    }
}