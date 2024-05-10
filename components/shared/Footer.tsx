// Importing necessary modules and components
import Image from "next/image" // Importing Image component from Next.js
import Link from "next/link" // Importing Link component from Next.js

// Footer component definition
const Footer = () => {
  return (
    // Render the footer section
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        {/* Link to homepage */}
        <Link href='/'>
          {/* Render logo */}
          <Image
            src="/assets/images/logo.svg" // Image source
            alt="logo" // Alt text for accessibility
            width={256} // Width of the image
            height={98} // Height of the image
          />
        </Link>
        {/* Copyright text */}
        <p>
          2024 UniVision. All Rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer // Export the Footer component
