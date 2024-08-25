import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { formatDateTime } from "@/lib/utils";
import { Doctor } from "@/types/appwrite.types";
import StatusBadge from "../StatusBadge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Status } from "@/types";

interface AppointmentCardProps {
  status: Status;
  schedule: string | Date;
  doctor: Doctor;
  appointmentId: string;
  location: "online" | "offline";
}

export default function AppointmentCard({ doctor, status, schedule, appointmentId, location }: AppointmentCardProps) {
  return (
    <div className="w-full max-w-md bg-secondary">
      <div className="grid gap-4 p-4  rounded-md">
        <div className="flex items-center justify-between">
          <StatusBadge status={status} />
          <div className="text-muted-foreground text-sm">
            <CalendarIcon className="mr-1 inline-block h-4 w-4" />
            {formatDateTime(schedule).dateOnly}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={doctor?.avatar} />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">DR. {doctor?.name}</div>
            <div className="text-muted-foreground text-sm">
              <ClockIcon className="mr-1 inline-block h-4 w-4" />
              {formatDateTime(schedule).timeOnly}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{location}</div>
          <Link href={`/appointments/${appointmentId}`}>
            <Button variant="outline" size="sm" >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
