"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import DoctorForm from "../forms/DoctorForm";
import clsx from "clsx";
import { Doctor } from "@/types/appwrite.types";

const DoctorDialog = ({
  type,
  doctor,
  children,
  isDropDown,
}: {
  type: "update" | "create" | "delete";
  doctor?: Doctor;
  children?: React.ReactNode;
  isDropDown?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isDropDown ? (
          <p className="text-14-regular cursor-pointer ml-2 capitalize">
            {type} profile
          </p>
        ) : (
          <Button
            className={clsx("capitalize", {
              "text-blue-500": type === "update",
              "bg-green-500": type === "create",
              "text-red-500": type === "delete",
            })}
          >
            {type}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="shad-dialog max-w-lg max-h-screen overflow-auto">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Doctor</DialogTitle>
          {type !== "delete" && (
            <DialogDescription>
              Please fill in the following details to {type} a Doctor
            </DialogDescription>
          )}
        </DialogHeader>
        <DoctorForm type={type} doctor={doctor} />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDialog;
