import NavBar from "@/components/NavBar";
import StatCard from "@/components/cards/StatCard";
import { columns } from "@/components/table/appointmentColumn";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentsList } from "@/actions/appointment.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { getAllUsers } from "@/actions/auth.actions";
import { patientColumns } from "@/components/table/patientColumns";
import DoctorDialog from "@/components/modals/DoctorDialog";
import { doctorColumns } from "@/components/table/doctorColumn";
import { getAllDoctors } from "@/actions/doctors.actions";
import { AppointmentTable } from "@/components/table/appointmentTable";
import { PatientTable } from "@/components/table/patientTable";
import { getAllRequests } from "@/actions/request.actions";
import { requestsColumn } from '@/components/table/requestsColumn'
import { AppointmentAnalyticsChart } from "@/components/adminChart";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();
  const users = await getAllUsers();
  const documents = await getAllRequests();

  const doctors = await getAllDoctors();

  return (
    <div>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome Admin👋</h1>
          <p className="text-dark-700">
            Start the day with managing new Appointments
          </p>
        </section>
        <section className="admin-stat">
          {/* <StatCard
            type="appointments"
            icon="/assets/icons/appointments.svg"
            count={appointments.scheduledCount}
            label="Scheduled Appointments"
          />
          <StatCard
            type="pending"
            icon="/assets/icons/pending.svg"
            count={appointments.pendingCount}
            label="Pending Appointments"
          /> */}
          <AppointmentAnalyticsChart appointments={appointments.documents} />
          {/* <StatCard
            type="cancelled"
            icon="/assets/icons/cancelled.svg"
            count={appointments.cancelledCount}
            label="Canceled Appointments"
          /> */}
        </section>
        {/* add tabs */}
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="max-w-md">
            <TabsTrigger
              value="appointments"
              className="w-full cursor-pointer"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="w-full  cursor-pointer"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="doctors"
              className="w-full cursor-pointer"
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="w-full cursor-pointer"
            >
              Requests
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="appointments"
            className="w-full h-fit p-4"
          >
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-2xl font-bold">Upcoming Appointments</h1>
              <p className="text-14-regular text-gray-400 ">
                View and manage your upcoming appointments.
              </p>
            </div>
            <AppointmentTable columns={columns} data={appointments.documents} doctors={doctors}/>
          </TabsContent>
          <TabsContent value="users" className=" w-full h-fit p-4">
            <div className="flex flex-col gap-1 mb-3">
              <h1 className="text-2xl font-bold">Users</h1>
              <p className="text-14-regular text-gray-400 ">
                View and manage all your users
              </p>
            </div>
            <PatientTable columns={patientColumns} data={users.usersList} />
          </TabsContent>
          <TabsContent
            value="doctors"
            className=" w-full h-fit p-4"
          >
            <div className="flex items-start justify-between ">
              <div className="flex flex-col gap-1 mb-3">
                <h1 className="text-2xl font-bold">Doctors</h1>
                <p className="text-14-regular text-gray-400 ">
                  View and manage all your doctors.
                </p>
              </div>
              <DoctorDialog type="create" />
            </div>
            <DataTable columns={doctorColumns} data={doctors} />
          </TabsContent>
          <TabsContent
            value="requests"
            className=" w-full h-fit p-4"
          >
            <div className="flex items-start justify-between ">
              <div className="flex flex-col gap-1 mb-3">
                <h1 className="text-2xl font-bold">Reschedule Requests</h1>
                <p className="text-14-regular text-gray-400 ">
                  View and manage all your Requests.
                </p>
              </div>
            </div>
            <DataTable
        columns={requestsColumn}
        data={documents}
      />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;
