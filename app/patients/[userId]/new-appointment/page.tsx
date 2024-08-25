import Image from "next/image";

import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
import { account, users } from "@/lib/appwrite.config";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import { SearchParamProps } from "@/types";
import NotRegisteredModal from "@/components/modals/NotRegisteredModal";
import { logo } from "@/constants";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  if(patient){
    Sentry.metrics.set("user_view_new-appointment", patient.name);
  }

  return (
    <div className="flex h-screen max-h-screen">
      <NotRegisteredModal userId={userId} patient={patient} />
      <UnauthorizedAccess requiredRole={"patient"}  />
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Image
          src={logo}
          alt="logo"
          height={32}
          width={162}
          className="h-10 mb-2 max-w-md object-cover cursor-pointer"
        />

          <AppointmentForm
            patientId={patient?.$id}
            userId={userId}
            type="create"
          />

          <p className="copyright mt-10 py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default Appointment;
