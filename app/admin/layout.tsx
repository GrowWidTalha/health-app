import NavBar from "@/components/NavBar";
import UnauthorizedAccess from "@/components/UnAuthorizedAccess";
import UserDropDown from "@/components/userDropDown";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col mx-auto max-w-7xl space-y-14">
      <UnauthorizedAccess requiredRole="admin" />
      <NavBar text="Admin Dashboard" href="/admin">
        <UserDropDown type="admin" />
      </NavBar>
      {children}
    </div>
  );
}
