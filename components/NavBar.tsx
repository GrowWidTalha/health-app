'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import React from "react";

const NavBar = ({
  text,
  children,
  href,
}: {
  text: string;
  href: string;
  children?: React.ReactNode;
}) => {
    const router = useRouter()
  return (
    <header className="admin-header">
        <Image
          src={"/assets/icons/logo-full.svg"}
          alt="logo"
          height={32}
          width={162}
          className="h-8 w-fit cursor-pointer"
          onClick={() => router.back()}
        />
      <div className="flex gap-3 items-center">
        <p className="text-16-semibold hidden sm:flex">{text}</p>
        {children}
      </div>
    </header>
  );
};

export default NavBar;
