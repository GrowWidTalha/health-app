"use client";

import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const patientColumns: ColumnDef<User>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <Link href={`/patients/${row.original.$id}?type=admin`}>
          <p className="text-14-medium underline">{patient.name}</p>
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return (
        <div className="min-w-[115px]">
          {row.original.email}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {row.original.phone}
        </p>
      );
    },
  },
  // {
  //   id: "actions",
  //   header: () => <div className="pl-4">Actions</div>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex gap-1">
  //         <AppointmentModal
  //           type="schedule"
  //           patientId={row.original.patient.$id}
  //           userId={row.original.userId}
  //           appointment={row.original}
  //         />
  //         <AppointmentModal
  //           type="cancel"
  //           patientId={row.original.patient.$id}
  //           userId={row.original.userId}
  //           appointment={row.original}
  //         />
  //       </div>
  //     );
  //   },
  // },
];
