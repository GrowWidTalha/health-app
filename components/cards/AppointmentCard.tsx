/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DCwlXVyAi3f
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { CalendarIcon, ClockIcon } from "lucide-react"
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import clsx from "clsx";
import { Doctor } from "@/types/appwrite.types";
import { Status } from "@/types";
import StatusBadge from "../StatusBadge";
import RequestRescheduleModal from "../modals/requestRescheduleModal";
import { Badge } from "../ui/badge";
interface AppointmentCardProps {
  status: Status;
  schedule: string | Date;
  reason: string;
  appointmentId: string;
  doctor: Doctor,
  location: "online" | "offline"
}
export default function AppointmentCard({ doctor, status, schedule, reason,appointmentId, location} : AppointmentCardProps) {


  return (
    <div className="w-full max-w-md border-none rounded-none " >
      <div className="grid gap-4 p-6 bg-appointments bg-cover stat-card  rounded-md">
        <div className="flex items-center justify-between">
         <StatusBadge status={status}/>
          <div className="text-muted-foreground text-sm">
            <CalendarIcon className="mr-1 inline-block h-4 w-4" />
            {formatDateTime(schedule).dateOnly}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src={doctor?.avatar} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium">DR. {doctor?.name}</div>
            <div className="text-muted-foreground text-sm">
              <ClockIcon className="mr-1 inline-block h-4 w-4" />
              {formatDateTime(schedule).timeOnly}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Reason</div>
            <div className="text-muted-foreground text-sm">{reason}</div>
            <Badge variant={"outline"}>{location}</Badge>
          </div>
          {status !== "completed"  && (
            <RequestRescheduleModal appointmentId={appointmentId} usertype="patient"/>
          )}
        </div>
      </div>
    </div>
  )
}
