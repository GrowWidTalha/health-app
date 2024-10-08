import Image from "next/image";
import { redirect } from "next/navigation";

import RegisterForm from "@/components/forms/RegisterForm";
import { getPatient, getUser } from "@/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import { SearchParamProps } from "@/types";
import { logo } from "@/constants";
const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId)
  const patient = await getPatient(userId);
  if (patient) redirect(`/patients/${userId}/dashboard`);

  Sentry.metrics.set("user_view_register", user?.name!);
  return (
    <div className="flex h-screen max-h-screen">
      <UnauthorizedAccess requiredRole={"patient"}  />
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <Image
          src={logo}
          alt="logo"
          height={32}
          width={162}
          className="h-10 mb-2 max-w-md object-cover cursor-pointer"
        />

          <RegisterForm user={user} />

          <p className="copyright py-12">© 2024 CarePluse</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
