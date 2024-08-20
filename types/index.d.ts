/* eslint-disable no-unused-vars */

import { PrescriptionFormValues } from "@/components/forms/PresprictionFrom";
import {  Doctor, RequestStatusType, RequestUserType } from "./appwrite.types";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other";
export declare type Status = "pending" | "scheduled" | "cancelled" | "completed";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare type Roles = "admin" | "doctor" | "patient";

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

declare type CreateAppointmentParams = {
  doctorid: string;
  userId: string;
  patient: string;
  doctor: Doctor | undefined;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
  appointmentType: "online" | "offline"
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare interface CreateDoctorParams {
  email: string;
  name: string;
  avatar: FormData | undefined;
  phone: string;
  areaOfExpertise: string;
}

declare interface CreateRequestParam {
  usertype: RequestUserType;
  requestedBy: string;
  reason: string;
  appointment: string;
  status: RequestStatusType;
  username: string,
}
export interface PrescriptionData {
    hospitalName: string;
    hospitalSlogan: string;
    doctorName: string;
    doctorSpecialty: string;
    primaryColor: string;
    patientName: string;
    patientAge: string;
    patientSex: string;
    date: string;
    prescriptionItems: PrescriptionFormValues;
    hospitalAddress: string;
    hospitalPhone: string;
    hospitalEmail: string;
    outputPath: string;
  }
 export type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;
