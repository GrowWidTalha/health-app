"use server";

import { ID, Query } from "node-appwrite";

import { Appointment } from "@/types/appwrite.types";

import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
  messaging,
} from "../lib/appwrite.config";
import { formatDateTime, parseStringify } from "../lib/utils";
import { revalidatePath } from "next/cache";

//  CREATE APPOINTMENT
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the existing appointment:",
      error
    );
  }
};
export const getRecentAppointmentsList = async () => {
  const appointments = await databases.listDocuments(
    DATABASE_ID!,
    APPOINTMENT_COLLECTION_ID!,
    [Query.orderDesc("$createdAt")]
  );

  const initialCount = {
    scheduledCount: 0,
    cancelledCount: 0,
    pendingCount: 0,
  };

  const counts = (appointments.documents as Appointment[]).reduce(
    (acc, appointment) => {
      if (appointment.status === "pending") {
        acc.pendingCount++;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount++;
      } else {
        acc.scheduledCount++;
      }

      return acc;
    },
    initialCount
  );

  const data = {
    totalCount: appointments.total,
    ...counts,
    documents: appointments.documents,
  };

  return parseStringify(data);
};

export const updateAppointment = async ({
  appointment,
  appointmentId,
  type,
  userId,
}: UpdateAppointmentParams) => {
  try {
    const updateAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    // TODO: add SMS alert

    const smsMessage = `

Hi, it's carepulse,
${
  type === "schedule"
    ? `Your appointment has been scheduled for ${formatDateTime(
        appointment.schedule
      ).dateTime} with DR. ${appointment.primaryPhysician}`
    : `We regret to inform you that your appointment has been cancelled for the following reason.
  Reason: ${appointment.cancellationReason}`
}`;
    await sendSmsNotification(userId, smsMessage);
    revalidatePath("/admin");
    return parseStringify(updateAppointment);
  } catch (error) {
    console.log("Error while updating the appointment", error);
  }
};

export const sendSmsNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );

    return parseStringify(message);
  } catch (error) {
    console.log("error while sending message: ", error);
  }
};
