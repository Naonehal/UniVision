// Import necessary components and functions
import ProgramForm from '@/components/shared/ProgramForm'
import { getProgramById } from '@/lib/actions/program.actions';
import { UpdateProgramParams } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react'

// Define the type for props
type UpdateProgramProps = {
  params: {
    id: string
  },
};

// Define the UpdateProgram component
const UpdateProgram = async ({ params: { id } }: UpdateProgramProps) => {
  // Fetch program details by ID
  const program = await getProgramById(id)

  // Get user session claims
  const { sessionClaims } = auth();
  // Extract userId from session claims
  const userId = sessionClaims?.userId as string;

  // Render the UpdateProgram component
  return (
    <>
      {/* Header section */}
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <h3 className='wrapper h3-bold text-center sm:text-left'>Update Program</h3>
      </section>
      
      {/* Main content */}
      <div className='wrapper my-8'>
        {/* Render the ProgramForm component */}
        <ProgramForm userId={userId} type="Update" program={program} programId={program._id } /> 
      </div>
    </>
  )
} 

export default UpdateProgram
