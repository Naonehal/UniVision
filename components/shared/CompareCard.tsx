// Importing necessary modules and components
import { IProgram } from '@/lib/database/models/program.model' // Importing Program interface
import { auth } from '@clerk/nextjs' // Importing authentication module
import Image from 'next/image' // Importing Image component from Next.js
import Link from 'next/link' // Importing Link component from Next.js
import React from 'react' // Importing React
import { DeleteConfirmation } from './DeleteConfirmation' // Importing DeleteConfirmation component
import { Button } from '../ui/button' // Importing Button component

// Define the props type for the CompareCard component
type CardProps = {
    program: IProgram // Program object
    addToComparison: (program: IProgram) => void; // Function to add program to comparison
}

// CompareCard component definition
const CompareCard = ({ program, addToComparison }: CardProps) => {
    
  return (
      // Render the compare card
      <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
          {/* Link to program details page */}
          <Link href={`/programs/${program._id}`} style={{ backgroundImage: `url(${program.imageUrl})` }} className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'>  </Link>

          {/* Program details */}
          <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
              {/* University name and program duration */}
              <div className='flex gap-2 justify-between'>
                  <p className='p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 truncate'>
                      {program.university.name}
                  </p>
                  <span className='p-semibold-14 w-max rounded-full bg-green-100 px-4 py-1 text-green-60 truncate'>
                      {program.duration}
                  </span>
              </div>
              {/* Delivery mode and compare button */}
              <p className='p-medium-16 p-medium-18 text-grey-500 flex items-center justify-between'>
                  {program.deliveryMode}
                  <Button className='button rounded-full' onClick={() => addToComparison(program)}>Compare</Button>
              </p>
              {/* Program name */}
              <p className='p-semibold-18 md:p-semibold-20 flex-1 text-black truncate'>
                  {program.programName}
              </p>
              {/* Program description */}
              <p className='p-medium-16 md:p-medium-18  text-black truncate'>
                  {program.programDescription}
              </p>
              {/* Tuition fees */}
              <p className='p-medium-16 p-medium-18 text-grey-500 '>
                    Tuition Fees Domestic: {' '}
                    <span className=' text-black'>
                        {program.tuitionFeesDomestic}
                    </span>
                </p>
          </div>
      </div>
  )
}

export default CompareCard // Export the CompareCard component
