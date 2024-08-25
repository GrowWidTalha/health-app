import clsx from "clsx";
import { CalendarCheck, CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled" | "total";
  count: number;
  label: string;
  icon: string;
}

const StatCard = ({ count, icon, label, type }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-cancelled": type === "cancelled",
        "bg-pending": type === "pending",
        "": type === "total",
        // "bg-green-500": type === "total",
      })}
    >
      <div className="flex items-center gap-4">
        {type === "total" ? (
          <CalendarCheck className="w-fit size-8 text-green-500"  />
        ) : (
          <Image
            className={`size-8  w-fit `}
            src={icon}
            alt={label}
            height={32}
            width={32}
          />

         )}
        <p className=" text-32-bold ">{count}</p>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
