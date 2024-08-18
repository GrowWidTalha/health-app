
import { getAppointmentsByUserId } from "@/actions/appointment.actions";
import { getPatient } from "@/actions/patient.actions";
import AppointmentCard from "@/components/cards/AppointmentCard";
import AppointmentModal from "@/components/modals/AppointmentModal";
import NotRegisteredModal from "@/components/modals/NotRegisteredModal";
import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import UserDropDown from "@/components/userDropDown";
import { useAppwrite } from "@/hooks/useAppwrite";
import { SearchParamProps } from "@/types";
import { Appointment } from "@/types/appwrite.types";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const PatientDashboard = async({ params: { userId } }: SearchParamProps) => {
  const appointments: Appointment[] = await getAppointmentsByUserId(userId)
  const patient = await getPatient(userId)


  return (
    <div className="flex flex-col  mx-auto max-w-7xl space-y-14">
      <UnauthorizedAccess requiredRole="patient"/>
      <NotRegisteredModal userId={userId} patient={patient} />
      <NavBar text="Patient Dashboard">
        <UserDropDown type="patient" patientId={userId}/></NavBar>
      <main className="flex flex-col items-center px-[5%] space-y-6 xl:space-y-12 xl:px-12">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome {patient.name} 👋</h1>
          <p className="text-dark-600">
            Get a sneak peak of your upcoming and recent appointments from here
          </p>
        </section>
        <section className="w-full space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">All Appointments</h2>
            <Button className="bg-green-500" asChild>
              <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment

              </Link>
              </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <AppointmentCard
                appointmentId={appointment.$id}
                  key={appointment.$id}
                  doctor={appointment.doctor!}
                  reason={appointment.reason}
                  schedule={appointment.schedule}
                  status={appointment.status}
                location={appointment.type}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
