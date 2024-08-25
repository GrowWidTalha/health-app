import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PatientAppointments from '@/components/PatientAppointments';
import { Appointment } from "@/types/appwrite.types";
import { Patient } from "@/types/appwrite.types"; // Assuming you have a Patient type
import UnauthorizedAccess from '@/components/UnAuthorizedAccess';
import NotRegisteredModal from '@/components/modals/NotRegisteredModal';
import NavBar from '@/components/NavBar';
import UserDropDown from '@/components/userDropDown';
import { getPatient } from '@/actions/patient.actions';
import { getAppointmentsByUserId } from '@/actions/appointment.actions';
import { SearchParamProps } from '@/types';

interface PatientDashboardProps {
  userId: string;
  appointments: Appointment[];
  patient: Patient;
}

const PatientDashboard = async ({ params: { userId} }: SearchParamProps) => {
    const patient = await getPatient(userId)
    const appointments = await getAppointmentsByUserId(userId)
    // if(!patient) return null;
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
      <UnauthorizedAccess requiredRole="patient"/>
      <NotRegisteredModal userId={userId} patient={patient} />
      <NavBar text="Patient Dashboard" href='/patients'>
        <UserDropDown type="patient" patientId={userId}/>
      </NavBar>
      <main className="flex flex-col items-center px-[5%] space-y-6 xl:space-y-12 xl:px-12">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome {patient?.name} 👋</h1>
          <p className="text-dark-600">
            Get a sneak peek of your upcoming and recent appointments from here
          </p>
        </section>

        <section className="w-full space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className=" md:text-3xl font-bold">Your Appointments</h2>
            <Button className="" asChild>
              <Link href={`/patients/${userId}/new-appointment`}>
                New Appointment
              </Link>
            </Button>
          </div>
          <PatientAppointments appointments={appointments} />
        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
