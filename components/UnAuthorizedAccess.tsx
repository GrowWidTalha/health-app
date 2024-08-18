"use client";
import { useAppwrite } from "@/hooks/useAppwrite";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
interface UnAuthorizedAccessProps {
  requiredRole: Roles;
}
export default function UnauthorizedAccess({
  requiredRole,
}: UnAuthorizedAccessProps) {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAppwrite();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the user is authorized once loading is complete
    if (!loading && user && isLoggedIn && user?.labels.includes(requiredRole)) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
    // if(user){
    //   if (user.labels[0] === "admin") {
    //     router.push("/admin");
    //   } else if (user.labels[0] === "doctor") {
    //     router.push("/doctor");
    //   } else if (user.labels[0] === "patient") {
    //     router.push(`/patient/${user.$id}/dashboard`);
    //   }
    // }
  }, [user, loading, isLoggedIn, requiredRole]);

  // Return null while loading to prevent unauthorized content from flashing
  if (loading || !user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <LoaderPinwheel className="size-8 animate-spin" />
      </div>
    );
  }

  // Show unauthorized access message if user is not authorized
  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="mx-4 w-full max-w-md rounded-lg bg-dark-500 bg-background p-6 shadow-lg sm:p-8">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Unauthorized Access
              </h2>
              <p className="mt-2 text-muted-foreground">
                You do not have permission to access the requested content.
              </p>
              <p className="mt-2 text-muted-foreground">
                Required Role:{" "}
                <span className="font-semibold">{requiredRole}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div
                onClick={() => router.back()}
                className="flex-1 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Go Back
              </div>
              <Link
                href="#"
                className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-center text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                prefetch={false}
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null if user is authorized
  return null;
}

// Define PropTypes for the component
