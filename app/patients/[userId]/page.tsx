import RegisterForm from "@/components/forms/RegisterForm";
import NavBar from "@/components/NavBar";
import { getPatient } from "@/actions/patient.actions";
import React from "react";
import { useAppwrite } from "@/hooks/useAppwrite";
import { redirect } from "next/navigation";
import { getCurrentUser, isLoggedIn } from "@/actions/auth.actions";

const PatientDetailsPage = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  const isLogIn = await isLoggedIn();
  const user = await getCurrentUser();
  
  if (user) {
    if (!(isLogIn && (user.$id === userId || user.labels[0] === "admin"))) {
      redirect("/");
    }
  }
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
      <NavBar text="Patient Details" />
      <div className="flex w-full justify-center ">
        <div className="max-w-2xl w-full">
          <RegisterForm patient={patient} isReadOnly />
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
