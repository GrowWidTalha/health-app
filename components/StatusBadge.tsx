import { StatusIcon } from "@/constants";
import { Status } from "@/types";
import clsx from "clsx";
import { LucideCheckCheck } from "lucide-react";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
        "bg-gray-600/10": status === "completed",
      })}
    >
      {status !== "completed" ? (
        <Image
          src={StatusIcon[status]}
          height={24}
          width={24}
          alt="status"
          className="h-fit w-3"
        />
      ): (
        <LucideCheckCheck className="h-fit w-3"/>
      )}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "scheduled",
          "text-blue-500": status === "pending",
          "text-red-500": status === "cancelled",
          "text-gray-300": status === "completed",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
