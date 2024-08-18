"use client";

import { ColumnDef } from "@tanstack/react-table";

import DoctorDialog from "../modals/DoctorDialog";
import { Doctor } from "@/types/appwrite.types";


export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "name",
    header: "DR. Name",
    cell: ({ row }) => {
      const doctor = row.original;

      return (
          <p className="text-14-medium">{doctor.name}</p>
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
  {
    accessorKey: "areaOfExpertise",
    header: "Area of Expertise",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[100px]">
          {row.original.areaOfExpertise}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex gap-1">
          <DoctorDialog
            type="update"
            doctor={row.original}
          />
          <DoctorDialog
            type="delete"
            doctor={row.original}
          />
        </div>
      );
    },
  },
];
