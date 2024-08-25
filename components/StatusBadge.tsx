import { StatusIcon } from "@/constants";
import { Status } from "@/types";
import clsx from "clsx";
import { Calendar, CheckCheckIcon, Cross, LucideCheckCheck, TimerReset } from "lucide-react";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-400": status === "scheduled",
        "bg-blue-300": status === "pending",
        "bg-red-300": status === "cancelled",
        "bg-gray-300": status === "completed",
      })}
    >
      {status === "completed" ? (
        <CheckCheckIcon
          height={24}
          width={24}
          className="h-fit w-3"
        />
      ): status === "scheduled" ? (
        <Calendar
          height={24}
          width={24}
          className="h-fit w-3"
        />
      ) : status === "cancelled" ? (
        <Cross
          height={24}
          width={24}
          className="h-fit w-3"
        />
      ): (
        <TimerReset
          height={24}
          width={24}
          className="h-fit w-3"
        />
      )}
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-700": status === "scheduled",
          "text-blue-700": status === "pending",
          "text-red-900": status === "cancelled",
          "text-black": status === "completed",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
