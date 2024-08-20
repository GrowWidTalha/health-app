import NavBar from "@/components/NavBar";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import UserDropDown from "@/components/userDropDown";

export default function DoctorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
      <UnauthorizedAccess requiredRole="doctor" />
      <NavBar text="Doctor Dashboard">
        <UserDropDown type="doctor" />
      </NavBar>
      {children}
    </div>
  );
}
