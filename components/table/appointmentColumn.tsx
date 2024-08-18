"use client";

import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import AppointmentModal from "../modals/AppointmentModal";
import StatusBadge from "../StatusBadge";
import { Badge } from "../ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <Link href={`/patients/${appointment.userId}?type=admin`} >
          <p className="text-14-medium underline">{appointment?.patient?.name}</p>
        </Link>
      );
    },
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
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
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
          <p className="whitespace-nowrap"> Dr. {doctor?.name}</p>
        </div>
      );
    },
  },
    {
        accessorKey: "type",
        header: () => "Location",
        cell: ({ row }) => {
        const type = row.original.type
        return (
            <Badge variant={"outline"}>{type}</Badge>
        );
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
