import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {  SendIcon } from "lucide-react"
import { SearchParamProps } from "@/types"
import { getAppointment } from "@/actions/appointment.actions"
import StatusBadge from "@/components/StatusBadge"
import { formatDateTime } from "@/lib/utils"
import PrescriptionForm from "@/components/forms/PresprictionFrom"
import AppointmentCompletedModal from "@/components/modals/appointmentCompletedModal"
import RequestRescheduleModal from "@/components/modals/requestRescheduleModal"

export default async function AppointmentDetailsPage({ params: { appointmentId}}: SearchParamProps) {
    const appointment = await getAppointment(appointmentId)
    if(!appointment) return null;
  return (

    <div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="grid gap-8">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Appointment Details</h1>
            <StatusBadge status={appointment.status} />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Patient</p>
              <p className="font-medium">{appointment.patient.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Doctor</p>
              <p className="font-medium">Dr. {appointment.doctor.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Date</p>
              <p className="font-medium">{formatDateTime(appointment.schedule).dateOnly}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Time</p>
              <p className="font-medium">{formatDateTime(appointment.schedule).timeOnly}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Reason for Appointment</p>
            <p>{appointment.reason}</p>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Actions</h2>
            {appointment.status !== "completed" && (<div>
            <AppointmentCompletedModal appointmentId={appointment.$id}/>
            <RequestRescheduleModal appointmentId={appointment.$id} usertype="doctor" />
            </div>)}
          </div>
    <PrescriptionForm appointment={appointment}/>
            </div>
          </div>
        </div>
  )
}
