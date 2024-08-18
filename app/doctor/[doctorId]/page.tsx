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

const DoctorDashboard = async ({ params: { doctorId } }: SearchParamProps) => {
  const doctor = await getDoctorById(doctorId);
  if (!doctor) return null;
  const data: any = await getRecentAppointmentsListForDoctors(doctor.$id);
  const appointments = filterAppointments(data.documents);

  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14 ">
      <UnauthorizedAccess requiredRole="doctor" />
      <NavBar text="Doctor Dashboard">
        <UserDropDown type="doctor" doctor={doctor} />
      </NavBar>
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
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-dark-200 max-w-md">
            <TabsTrigger
              value="upcoming"
              className="w-full data-[state=active]:bg-dark-400 cursor-pointer"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="today"
              className="w-full data-[state=active]:bg-dark-400 cursor-pointer"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="w-full data-[state=active]:bg-dark-400 cursor-pointer"
            >
              Recent
            </TabsTrigger>
          </TabsList>
          <TabsContent value="today" className="bg-dark-400 w-full h-fit p-4">
          <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-2xl font-bold">Today Appointments</h1>
              <p className="text-14-regular text-gray-400 ">
                View and manage your today appointments.
              </p>
            </div>
            {appointments.todayAppointments.length > 0 ? (
              <DataTable
                columns={DoctorAppointmentColumn}
                data={appointments.todayAppointments}
              />
            ) : (
              <div className="">No appointments Today</div>
            )}
          </TabsContent>
          <TabsContent value="upcoming" className="bg-dark-400 w-full h-fit p-4">
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-2xl font-bold">Upcoming Appointments</h1>
              <p className="text-14-regular text-gray-400 ">
                View and manage your upcoming appointments.
              </p>
            </div>
            {appointments.upcomingAppointments.length > 0 ? (
              <DataTable
                columns={DoctorAppointmentColumn}
                data={appointments.upcomingAppointments}
              />
            ) : (
              <div className="">No upcoming appointments</div>
            )}
          </TabsContent>
          <TabsContent
            value="recent"
            className="flex gap-2 flex-col bg-dark-400 w-full h-fit"
          >
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-2xl font-bold">Recent Appointments</h1>
              <p className="text-14-regular text-gray-400 ">
                View and manage your recent appointments.
              </p>
            </div>
            {appointments.recentAppointments.length > 0 ? (
              <DataTable
                columns={DoctorAppointmentColumn}
                data={appointments.recentAppointments}
              />
            ) : (
              <div className="">No recent appointments</div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DoctorDashboard;
