"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, User2, UserIcon } from "lucide-react";
import appwriteService from "@/hooks/auth.lib";
import { useRouter } from "next/navigation";
import DoctorDialog from "./modals/DoctorDialog";
import { Doctor } from "@/types/appwrite.types";
import SettingsModal from "./modals/SettingsModal";

const UserDropDown = ({
  type,
  doctor,
  patientId,
}: {
  type: "doctor" | "patient" | "admin";
  doctor?: Doctor;
  patientId?: string;
}) => {
  const router = useRouter();
  const onLogOut = async () => {
    await appwriteService.logout();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden size-8 rounded-full border-green-500"
        >
          <User2 className="size-7 text-green-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {type === "doctor" && (
          <DropdownMenuItem asChild>
            <DoctorDialog type="update" doctor={doctor} isDropDown />
          </DropdownMenuItem>
        )}
        {type === "patient" && (
          <div>
            <DropdownMenuItem asChild className="cursor-pointer">
              <p
                onClick={() => router.push(`/patients/${patientId}?type=patient`)}
              >
                My profile
              </p>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <p
                onClick={() => router.push(`/patients/${patientId}/new-appointment`)}
              >
                New Appointment
              </p>
            </DropdownMenuItem>
          </div>
        )}
        {type === "admin" && (
                <DropdownMenu>

                    <SettingsModal />
                    </DropdownMenu>
        )}

        <DropdownMenuItem onClick={() => onLogOut()} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
