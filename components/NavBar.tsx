import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBar = ({ text } : {text: string}) => {
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

        <p className="text-16-semibold">{text}</p>
      </header>
  )
}

export default NavBar