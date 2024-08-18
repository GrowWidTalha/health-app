import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/actions/patient.actions";
import { SearchParamProps } from "@/types";
import { google } from "calendar-link";
import CopyInput from "@/components/copyInput";

const RequestSuccess = async ({
  searchParams,
  params: { userId },
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  const user = await getUser(userId);

  Sentry.metrics.set("user_view_appointment-success", user?.name!);

  const doctor = appointment?.doctor;
  if(!doctor) return null;

  const event = {
    title: `appointment with 1 ${doctor.name}`,
    description: `Reason: ${appointment.reason}`,
    start: formatDateTime(appointment.schedule).dateTime,
    duration: [1, "hour"],
    guests: [doctor.email]
  };

  const eventLink = google({
    title: `Appointment with ${doctor.name}`,
    description: `Reason: ${appointment.reason}`,
    start: formatDateTime(appointment.schedule).dateTime,
    duration: [1, "hour"],
    guests: [doctor.email]
  })
  console.log(eventLink);

  return (
    <div className=" flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>
        <section className="flex gap-2 items-center justify-between">
          <p className="whitespace-nowrap ">
            Add to Calendar:
          </p>
        <CopyInput text={eventLink} />
        </section>
        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.avatar!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <div className="flex gap-4">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>
          <Button
            variant={"ghost"}
            className="hover:bg-accent hover:text-accent-foreground"
            asChild
          >
            <Link href={`/patients/${userId}/dashboard`}>Go to dashboard</Link>
          </Button>
        </div>
        <p className="copyright">© 2024 CarePluse</p>
      </div>
    </div>
  );
};

export default RequestSuccess;
