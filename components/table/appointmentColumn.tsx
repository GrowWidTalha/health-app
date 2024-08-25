"use client"
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import AppointmentModal from "../modals/AppointmentModal";
import StatusBadge from "../StatusBadge";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium text-black">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <Link href={`/patients/${appointment.userId}?type=admin`} >
          <p className="text-14-medium underline text-black">{appointment?.patient?.name}</p>
        </Link>
      );
    },
    // Enable filtering by patient name or email
    filterFn: (row, id, value) => {
        const patient = row.original.patient;
        if (!value) return true;
        const searchValue = value.toLowerCase();
        return (
          patient?.name?.toLowerCase().includes(searchValue) ||
          patient?.email?.toLowerCase().includes(searchValue)
        );
      },
      enableGlobalFilter: true, // Important to allow global filtering
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
    // Enable filtering by status
    filterFn: (row, id, value) => {
      if (value === null) return true;
      return row.original.status === value;
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular text-black min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
    // Enable sorting and filtering by date
    sortingFn: "datetime",
    filterFn: (row, id, value) => {
      if (!value) return true;
      const appointmentDate = new Date(row.original.schedule);
      const filterDate = new Date(value);
      return appointmentDate.toDateString() === filterDate.toDateString();
    },
  },
  {
    accessorKey: "doctor",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = row.original.doctor
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.avatar!}
            alt="doctor"
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap text-black"> Dr. {doctor?.name}</p>
        </div>
      );
    },
    // Enable filtering by doctor name or ID
    filterFn: (row, id, value) => {
      if (value === null) return true;
      const doctor = row.original.doctor;
      return doctor?.name?.toLowerCase().includes(value.toLowerCase()) ||
             doctor?.$id?.toLowerCase().includes(value.toLowerCase()) || false;
    },
  },
  {
    accessorKey: "type",
    header: () => "Location",
    cell: ({ row }) => {
      const type = row.original.type
      return (
        <Badge variant={"default"}>{type}</Badge>
      );
    },
    // Enable filtering by location
    filterFn: (row, id, value) => {
        if (value === null) return true;
        return row.original.type === value;
      },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
          <AppointmentModal
            type="cancel"
            patientId={row.original.patient.$id}
            userId={row.original.userId}
            appointment={row.original}
          />
        </div>
      );
    },
  },
];
