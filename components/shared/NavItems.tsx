// Importing necessary modules and components
'use client';
import { headerLinks, adminLinks, defaultLinks } from '@/constants'; // Importing navigation links
import Link from 'next/link'; // Importing Link component from Next.js
import { usePathname } from 'next/navigation'; // Importing usePathname hook from Next.js navigation
import React, { useState, useEffect } from 'react'; // Importing React and its hooks
import { useUser } from "@clerk/nextjs"; // Importing useUser hook from Clerk

// Define admin email
const adminEmail = "nao.work07@gmail.com";

// NavItems component definition
const NavItems = () => {
  // Get user authentication status and user details
  const { isSignedIn, user } = useUser();
  // Get current pathname
  const pathname = usePathname();
  // State to store navigation links
  const [links, setLinks] = useState(defaultLinks);

  // Update navigation links based on user authentication and role
  useEffect(() => {
    if (isSignedIn) {
      // Extract user's email address
      const userEmail = user?.emailAddresses[0]?.emailAddress || '';
      // If user is admin, set admin links; otherwise, set default header links
      if (userEmail.toLowerCase() === adminEmail.toLowerCase()) {
        setLinks([...adminLinks]);
      } else {
        setLinks([...headerLinks]);
      }
    }
  }, [isSignedIn, user]);

  return (
    // Render navigation links
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
      {links.map((link) => {
        // Check if link is active
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}
          >
            {/* Render link */}
            <Link href={link.route}>{link.label}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default NavItems // Export the NavItems component
