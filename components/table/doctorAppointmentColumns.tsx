"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { CalendarIcon, CheckIcon, MoreHorizontal } from "lucide-react";
import { Appointment, Doctor } from "@/types/appwrite.types";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import RequestRescheduleModal from "../modals/requestRescheduleModal";
import AppointmentCompletedModal from "../modals/appointmentCompletedModal";
import { Badge } from "../ui/badge";
import Link from "next/link";
export const DoctorAppointmentColumn: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <div className="flex flex-col gap-2">
          <p className="text-14-medium">{patient.patient.name}</p>
          <p className="text-14regular">{patient.patient.email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          {formatDateTime(row.original.schedule).dateOnly}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(row.original.schedule).timeOnly}
        </p>
      );
    },
  },
  {
    accessorKey: "Reason",
    header: "Reason",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">{row.original.reason}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
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
        <div className="flex items-center gap-2">
          <AppointmentCompletedModal appointmentId={row.original.$id}/>
          <RequestRescheduleModal appointmentId={row.original.$id} usertype="doctor" />
          <Link href={`/doctor/${row.original.doctor.$id}/${row.original.$id}/details`}>
            <Button variant={"ghost"}>
                View
            </Button>
          </Link>
        </div>
      );
    },
  },
];
