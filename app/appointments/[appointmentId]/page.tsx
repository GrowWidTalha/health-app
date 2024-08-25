
import { Separator } from "@/components/ui/separator"
import { SearchParamProps } from "@/types"
import { getAppointment } from "@/actions/appointment.actions"
import StatusBadge from "@/components/StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Appointment } from "@/types/appwrite.types"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"
import RequestRescheduleModal from "@/components/modals/requestRescheduleModal"

export default async function AppointmentDetailsPage({ params: { appointmentId } }: SearchParamProps) {
    const appointment: Appointment = await getAppointment(appointmentId)
    if (!appointment) return null;
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
                    {/* </div> */}
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Reason for Appointment</p>
                        <p>{appointment.reason}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p>{appointment.type}</p>
                    </div>
                    {appointment.type === "online" && (
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Payment</p>
                            <p>{appointment.isPaid ? "Yes" : "No"}</p>
                        </div>
                    )
                    }
                    {appointment.status === "completed" && appointment.presprictionLink && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Prescription</p>
                            <Link href={appointment.presprictionLink} target="_blank">
                            {/* {appointment.presprictionLink} */}
                            <Button size={"sm"} className="gap-2 flex" >
                                <Download className="size-4" /> Download
                            </Button>
                            </Link>
                        </div>
                    )
                    }
                    </div>
                   <div className="flex items-center justify-between">
                   <h1 className="text-2xl font-bold">Actions</h1>
                     {appointment.status !== "completed" && (
                         <div className="space-y-2">
                             <RequestRescheduleModal usertype="patient" appointmentId={appointment.$id}/>
                         </div>
                     )
                     }
                   </div>
                    </div>
                {/* <Separator /> */}

            </div>
        </div>
    )
}
