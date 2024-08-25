"use server"
import { DATABASE_ID, databases, SETTINGS_COLLECTION_ID } from "@/lib/appwrite.config"
import { parseStringify } from "@/lib/utils"
import { updateSettingsProps} from "@/types/appwrite.types"
import { Query } from "node-appwrite";
import NodeCache from 'node-cache';

const settingsCache = new NodeCache({ stdTTL: 6000000000, checkperiod: 120 });


export const updateSettings = async(data: updateSettingsProps) => {
    try {
        const document =await databases.updateDocument(
            DATABASE_ID!,
            SETTINGS_COLLECTION_ID!,
            "66c9c732003b04d21a6b",
            {
                ...data,
                onlineAppointmentFees: data.onlineAppointmentFees
            }
        )
        await invalidateCache()
        return parseStringify(document)
    } catch (error) {
console.log("error updating settings: ", error)
    }
}
export const getSettings = async() => {
    try {
        const settings = await databases.getDocument(
            DATABASE_ID!,
            SETTINGS_COLLECTION_ID!,
            "66c9c732003b04d21a6b"
          );

          return parseStringify(settings);
    } catch (error) {
console.log("error retrieving settings: ", error)
    }
}



// Initialize cache with a default TTL of 10 minutes (600 seconds)

export async function getCachedSetting() {
  // Try to get the setting from the cache
  let setting = settingsCache.get("settings");

  if (!setting) {
    // If not in the cache, fetch from the database
    setting = await getSettings();
    console.log("getting and setting cache")
    // Store it in the cache for future use
    settingsCache.set("settings", setting);
  }

  return setting;
}

async function invalidateCache() {
  settingsCache.flushAll();
}
