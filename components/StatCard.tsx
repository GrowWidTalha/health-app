import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
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
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          className="size-8 w-fit"
          src={icon}
          alt={label}
          height={32}
          width={32}
        />
        <p className="text-white text-32-bold ">{count}</p>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
