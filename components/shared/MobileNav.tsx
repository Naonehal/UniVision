// Importing necessary modules and components
import React from 'react' // Importing React
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet" // Importing components from sheet UI component
import Image from "next/image" // Importing Image component from Next.js
import { Separator } from "@/components/ui/separator" // Importing Separator component
import NavItems from './NavItems' // Importing NavItems component

// MobileNav component definition
const MobileNav = () => {
  return (
    // Render mobile navigation menu
    <nav className='md:hidden'>
      {/* Render sheet for mobile navigation */}
      <Sheet>
        {/* Trigger for mobile navigation */}
        <SheetTrigger className='align-middle'>
          <Image
            src="/assets/icons/menu.svg" // Menu button icon
            alt="Menu Button" // Alt text for accessibility
            width={24} // Width of the icon
            height={24} // Height of the icon
            className='cursor-pointer' // CSS class for styling
          />
        </SheetTrigger>
        {/* Content of the mobile navigation menu */}
        <SheetContent className='flex flex-col gap-6 bg-white md:hidden'>
          {/* Logo */}
          <Image
            src="/assets/images/logo.svg" // Logo image
            alt="logo" // Alt text for accessibility
            width={128} // Width of the logo
            height={38} // Height of the logo
          />
          {/* Separator */}
          <Separator className="border border-grey-50" /> {/* Separator component */}
          {/* Navigation items */}
          <NavItems /> {/* Render navigation items */}
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileNav // Export the MobileNav component
