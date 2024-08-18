import RegisterForm from "@/components/forms/RegisterForm";
import NavBar from "@/components/NavBar";
import { getPatient } from "@/actions/patient.actions";
import { useEffect, useState } from "react";
import { useAppwrite } from "@/hooks/useAppwrite";
import { Patient } from "@/types/appwrite.types";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import { Roles, SearchParamProps } from "@/types";

// Define the type for props

// Server component to render patient details
const PatientDetailsPage = async ({ params: { userId }, searchParams }: SearchParamProps) => {
  const {type} = searchParams
  const patient = await getPatient(userId)
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
      <UnauthorizedAccess requiredRole={type as Roles}  />
      <NavBar text="Patient Details" />
      <div className="flex w-full justify-center">
        <div className="max-w-2xl w-full">
          {patient ? (
            <RegisterForm patient={patient} isReadOnly />
          ) : (
            <div>Loading...</div>
          )}
          {/* Pass 'type' as a prop */}
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
