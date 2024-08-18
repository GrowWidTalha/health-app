"use client";

import { formatDateTime } from "@/lib/utils";
import { Request } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import ConfirmationModal from "../modals/confirmationModal";
import { updateRequest } from "@/actions/request.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AppointmentModal from "../modals/AppointmentModal";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const requestsColumn: ColumnDef<Request>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "usertype",
    header: "User Type",
    cell: ({ row }) => {
      const patient = row.original;

      return <p className="text-14-medium capitalize">{patient.usertype}</p>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ row }) => {
      return <div className="">{row.original.username}</div>;
    },
  },
  {
    accessorKey: "reason",
    header: "Reason",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[50px]">{row.original.reason}</p>
      );
    },
  },
  {
    accessorKey: "orignalappointment",
    header: "Orignal Appointment",
    cell: ({ row }) => {
      return (
        <p className="text-14-regular min-w-[50px]">
          {formatDateTime(row.original.appointment?.schedule).dateOnly} at{" "}
          {formatDateTime(row.original.appointment?.schedule).timeOnly} <br />
          with {row.original.appointment?.doctor?.name}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const onApprove = async () => {
        try {
          const update = await updateRequest(row.original.$id, {
            status: "approved",
          });
        } catch (error) {
          console.log("error approving request: ", error);
        }
      };
      const onReject = async () => {
        try {
          const update = await updateRequest(row.original.$id, {
            status: "approved",
          });
        } catch (error) {
          console.log("error approving request: ", error);
        }
      };
      return (
        <div className="px-4 py-3 flex items-center gap-2">
          <ConfirmationModal
            heading="Are you sure?"
            onClick={onApprove}
            description="Are you sure that you want to approve this request?. Make sure that you have took appropriate action before procedding."
          >
            <Button size="sm" className="bg-green-500 hover:bg-green-500/40">
              Approve
            </Button>
          </ConfirmationModal>
          <ConfirmationModal
            heading="Are you sure?"
            onClick={onApprove}
            description="Are you sure that you want to reject this request?. Make sure that you have took appropriate action before procedding."
          >
            <Button className="bg-red-500 hover:bg-red-500/45">Deny</Button>
          </ConfirmationModal>
          {/* <Select>
            <SelectTrigger className="w-[130px] bg-dark-300">
              <SelectValue placeholder="Select Action" />
            </SelectTrigger>
            <SelectContent className="bg-dark-300">
              <SelectItem value="reschedule" asChild>
                <AppointmentModal
                  appointment={row.original.appointment}
                  type="schedule"
                  userId={row.original.appointment.userId}
                  patientId={row.original.appointment.patient.$id}
                />
              </SelectItem>
              <SelectItem value="cancel" asChild> */}
              <AppointmentModal
                  appointment={row.original.appointment}
                  type="cancel"
                  userId={row.original.appointment.userId}
                  patientId={row.original.appointment.patient.$id}
                />
              {/* </SelectItem> */}
            {/* </SelectContent> */}
          {/* </Select> */}
        </div>
      );
    },
  },
];
