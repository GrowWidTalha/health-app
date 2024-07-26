import NavBar from "@/components/NavBar";
import StatCard from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentsList } from "@/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentsList();
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
    <NavBar text="Admin Dashboard"/>
      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome Admin👋</h1>
          <p className="text-dark-700">
            Start the day with managing new Appointments
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
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
          />
          <StatCard
            type="cancelled"
            icon="/assets/icons/cancelled.svg"
            count={appointments.cancelledCount}
            label="Canceled Appointments"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
