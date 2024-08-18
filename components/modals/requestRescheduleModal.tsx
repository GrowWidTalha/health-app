"use client";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { useState } from "react";
import CreateRequestForm from "../forms/createRequestForm";
import { RequestUserType } from "@/types/appwrite.types";
import { useAppwrite } from "@/hooks/useAppwrite";
const RequestRescheduleModal = ({
  usertype,
  appointmentId,
}: {
  usertype: RequestUserType;
  appointmentId: string;
}) => {
  const [open, setopen] = useState(false);
  const {user} = useAppwrite()
  if(!user) return null;
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="bg-dark-300 gap-1">
          <CalendarIcon className="h-4 w-4" />
          Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-300">
        <DialogHeader>
          <DialogTitle>Request to reschedule appointment</DialogTitle>
          <DialogDescription>
            Fill these details to request a reschedule of this appointment
          </DialogDescription>
          
              <CreateRequestForm
                setOpen={setopen}
                appointmentId={appointmentId}
                userId={user.$id}
                usertype={usertype}
                username={user.name}
              />

          
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RequestRescheduleModal;
