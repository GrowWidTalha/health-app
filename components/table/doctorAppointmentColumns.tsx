'use client'
import { ColumnDef } from "@tanstack/react-table"

import { Appointment } from "@/types/appwrite.types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format, parse, isAfter, isBefore, isEqual, subDays, startOfDay } from "date-fns"
import { formatDateTime } from "@/lib/utils"
import StatusBadge from "../StatusBadge"

export const DoctorAppointmentColumn: ColumnDef<Appointment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="text-14-medium">{row.index + 1}</div>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const patient = row.original.patient
      return (
        <div className="flex flex-col gap-2">
          <p className="text-14-medium">{patient.name}</p>
          <p className="text-14-regular">{patient.email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: "schedule",
    header: "Date & Time",
    cell: ({ row }) => {
      const schedule = row.getValue("schedule") as string
      return (
        <div>
          <div>{formatDateTime(schedule).dateOnly}</div>
          <div>{formatDateTime(schedule).timeOnly}</div>
        </div>
      )
    },
    filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;

        const schedule = row.getValue(columnId) as string;

        // Directly parse the ISO date string
        const appointmentDate = new Date(schedule);
        const today = startOfDay(new Date());


        if (typeof filterValue === 'string') {
          switch (filterValue) {
            case 'today':
              return isEqual(startOfDay(appointmentDate), today);
            case 'upcoming':
              return isAfter(appointmentDate, today);
            case 'recent':
              return isBefore(appointmentDate, today) && isAfter(appointmentDate, subDays(today, 7));
            default:
              return false;
          }
        } else if (filterValue instanceof Date) {
          return isEqual(startOfDay(appointmentDate), startOfDay(filterValue));
        }

        return true;
  }},
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => <div className="text-14-regular">{row.getValue("reason")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue === 'all') return true
      return row.getValue(columnId) === filterValue
    },
  },
  {
    accessorKey: "type",
    header: "Location",
    cell: ({ row }) => <Badge variant="outline">{row.getValue("type")}</Badge>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointment = row.original
      return (
        <Link href={`/doctor/${appointment.doctor.$id}/${appointment.$id}/details`}>
          <Button variant="ghost">View</Button>
        </Link>
      )
    },
  },
]
