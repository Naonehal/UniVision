'use client';

import { headerLinks, adminLinks, defaultLinks } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const adminEmail = "Sanilpaul05@gmail.com"; 



const NavItems = () => {
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const [links, setLinks] = useState(defaultLinks);

  useEffect(() => {
    if (isSignedIn) {
      const userEmail = user?.emailAddresses[0]?.emailAddress || '';
      if (userEmail.toLowerCase() === adminEmail.toLowerCase()) {
        setLinks([ ...adminLinks]);
      } else {
          setLinks([ ...headerLinks]);
      }
    }
  }, [isSignedIn, user]);


    // console.log(user)

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
      {links.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems