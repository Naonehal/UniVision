// Importing necessary modules and components
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs" // Importing authentication components from Clerk
import Image from "next/image" // Importing Image component from Next.js
import Link from "next/link" // Importing Link component from Next.js
import { Button } from "../ui/button" // Importing Button component
import NavItems from "./NavItems" // Importing NavItems component
import MobileNav from "./MobileNav" // Importing MobileNav component

// Header component definition
const Header = () => {
  return (
    // Render the header section
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        {/* Logo linking to homepage */}
        <Link href="/" className="w-60">
          {/* Render the logo */}
          <Image
            src="/assets/images/logo.svg" // Image source
            width={256} // Width of the image
            height={98} // Height of the image
            alt="UniVision Logo" // Alt text for accessibility
          />
        </Link>

        {/* Render navigation items for signed-in users */}
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        {/* Render user button and mobile navigation */}
        <div className="flex w-32 justify-end gap-3">
          {/* Render user button and mobile navigation for signed-in users */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" /> {/* User button component */}
            <MobileNav /> {/* Mobile navigation component */}
          </SignedIn>
          {/* Render sign-in button for signed-out users */}
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link> {/* Link to sign-in page */}
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

export default Header // Export the Header component
