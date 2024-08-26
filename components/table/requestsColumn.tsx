"use client";

import { formatDateTime } from "@/lib/utils";
import { Request } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ConfirmationModal from "../modals/confirmationModal";
import AppointmentModal from "../modals/AppointmentModal";
import { updateRequest } from "@/actions/request.actions";
import { useState } from "react";

// ActionCell component
const ActionCell = ({ row }: {row: any}) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const onApprove = async () => {
    try {
      await updateRequest(row.original?.$id, { status: "approved" });
    } catch (error) {
      console.log("Error approving request: ", error);
    }
  };

  const onReject = async () => {
    try {
      await updateRequest(row.original?.$id, { status: "rejected" });
    } catch (error) {
      console.log("Error rejecting request: ", error);
    }
  };

  const handleActionChange = (value: any) => {
    setSelectedAction(value);
  };

  return (
    <div className="px-4 py-3 flex items-center gap-2">
      <ConfirmationModal
        heading="Are you sure?"
        onClick={onApprove}
        description="Are you sure that you want to approve this request? Make sure that you have taken appropriate action before proceeding."
      >
        <Button size="sm">Approve</Button>
      </ConfirmationModal>

      <ConfirmationModal
        heading="Are you sure?"
        onClick={onReject}
        description="Are you sure that you want to reject this request? Make sure that you have taken appropriate action before proceeding."
      >
        <Button variant="destructive">Deny</Button>
      </ConfirmationModal>

      <Select onValueChange={handleActionChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Select Action" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reschedule">Reschedule</SelectItem>
          <SelectItem value="cancel">Cancel</SelectItem>
        </SelectContent>
      </Select>

      {selectedAction === 'reschedule' && (
        <AppointmentModal
          appointment={row.original.appointment}
          type="schedule"
          userId={row.original.appointment.userId}
          patientId={row.original.appointment.patient?.$id}
        />
      )}

      {selectedAction === 'cancel' && (
        <AppointmentModal
          appointment={row.original.appointment}
          type="cancel"
          userId={row.original.appointment.userId}
          patientId={row.original.appointment.patient?.$id}
        />
      )}
    </div>
  );
};

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
    header: "Original Appointment",
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
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
