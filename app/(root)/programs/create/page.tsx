// Import necessary components and functions
import ProgramForm from '@/components/shared/ProgramForm'
import { auth } from '@clerk/nextjs';
import React from 'react'

// Define the CreateProgram component
const CreateProgram = () => {
    // Get user session claims
    const { sessionClaims } = auth();

    // Extract userId from session claims
    const userId = sessionClaims?.userId as string;
  
    // Render the CreateProgram component
    return (
      <>
        {/* Header section */}
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
          <h3 className='wrapper h3-bold text-center sm:text-left'>Create Program</h3>
        </section>
      
        {/* Main content */}
        <div className='wrapper my-8'>
          {/* Render the ProgramForm component */}
          <ProgramForm userId = {userId} type="Create" /> 
        </div>
      </>
    )
}

export default CreateProgram
