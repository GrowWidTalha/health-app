"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Patient } from "@/types/appwrite.types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const NotRegisteredModal = ({
  patient,
  userId,
}: {
  patient: Patient | null;
  userId: string;
}) => {
  const router = useRouter();
  return (
    <AlertDialog open={patient ? false : true}>
      <AlertDialogContent className="bg-dark-400">
        <AlertDialogHeader>
          <AlertDialogTitle>Registration Pending</AlertDialogTitle>
          <AlertDialogDescription>
            Dear patient you&apos;ve not filled the registration form. Please fill
            that first.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => router.push(`/patients/${userId}/register`)}
            asChild
          >
            <Button className="bg-green-500">Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotRegisteredModal;
