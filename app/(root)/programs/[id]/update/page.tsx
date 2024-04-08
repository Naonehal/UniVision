import ProgramForm from '@/components/shared/ProgramForm'
import { getProgramById } from '@/lib/actions/program.actions';
import { UpdateProgramParams } from '@/types';
import { auth } from '@clerk/nextjs';
import React from 'react'


type UpdateProgramProps = {
  params: {
    id: string
  },
};

const UpdateProgram = async ({ params: { id } }: UpdateProgramProps) => {
  const program = await getProgramById(id)
    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;
    return (
      <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
          <h3 className='wrapper h3-bold text-center sm:text-left'>Update Program</h3>
      </section>
      
      <div className='wrapper my-8'>
          <ProgramForm userId={userId} type="Update" program={program} programId={program._id } /> 
        </div>
    </>
  )
} 

export default UpdateProgram