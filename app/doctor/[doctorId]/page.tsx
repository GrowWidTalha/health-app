import { getRecentAppointmentsListForDoctors } from "@/actions/appointment.actions";
import { getDoctorById } from "@/actions/doctors.actions";
import NavBar from "@/components/NavBar";
import StatCard from "@/components/cards/StatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import { SearchParamProps } from "@/types";
import React from "react";
import { filterAppointments } from "@/lib/utils";
import UserDropDown from "@/components/userDropDown";
import { DataTable } from "@/components/table/DataTable";
import { DoctorAppointmentColumn } from "@/components/table/doctorAppointmentColumns";
import { DoctorAppointmentTable } from "@/components/table/doctorAppointmentTable";

const DoctorDashboard = async ({ params: { doctorId } }: SearchParamProps) => {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) return null;
  const data: any = await getRecentAppointmentsListForDoctors(doctor.$id);

  return (
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome {doctor.name}</h1>
          <p className="text-dark-700">
            Start the day reviewing your upcoming meetings
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appointments"
            icon="/assets/icons/appointments.svg"
            count={data.todayScheduledCount}
            label="Today Appointments"
          />
          <StatCard
            type="pending"
            icon="/assets/icons/pending.svg"
            count={data.requestedCount}
            label="Pending Appointments"
          />
          <StatCard
            type="total"
            icon="/assets/icons/appointments.svg"
            count={data.totalCount}
            label="Total Appointments"
          />
        </section>
        <section className=" w-full h-fit p-4">
        <div className="flex flex-col gap-1 mb-3">
          <h1 className="text-2xl font-bold">All Appointments</h1>
          <p className="text-14-regular text-gray-400">
            View and manage all your appointments.
          </p>
        </div>
        <DoctorAppointmentTable
          columns={DoctorAppointmentColumn}
          data={data.documents}
        />
      </section>
      </main>
  );
};

export default DoctorDashboard;
