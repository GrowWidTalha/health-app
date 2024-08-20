import { Models } from "node-appwrite";
import { Gender, Status } from ".";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
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
  identificationDocumentURL: string;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
  doctor: Doctor;
  isPaid: boolean;
  presprictionLink: string;
  type: "online" | "offline"
}
export interface Doctor extends Models.Document {
  name: string;
  email: string;
  doctor_user_id: string;
  areaOfExpertise: string;
  avatar: string;
  phone: string;
}
export interface Request extends Models.Document {
  usertype: RequestUserType;
  requestedBy: string;
  reason: string;
  appointment: Appointment;
  status:RequestStatusType;
  username: string;
}

export type RequestUserType = "patient" | "doctor"
export type RequestStatusType = "rejected" |"approved" | "pending";
