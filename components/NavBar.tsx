import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = ({
  text,
  children,
}: {
  text: string;
  children?: React.ReactNode;
}) => {
  return (
    <header className="admin-header">
      <Link href={"/"}>
        <Image
          src={"/assets/icons/logo-full.svg"}
          alt="logo"
          height={32}
          width={162}
          className="h-8 w-fit"
        />
      </Link>
      <div className="flex gap-3 items-center">
        <p className="text-16-semibold hidden sm:flex">{text}</p>
        {children}
      </div>
    </header>
  );
};

export default NavBar;
