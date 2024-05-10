
import { IProgram } from '@/lib/database/models/program.model'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'
import { Button } from '../ui/button'



type CardProps = {
    program: IProgram
    addToComparison: (program: IProgram) => void;
}

const CompareCard = ({ program, addToComparison }: CardProps) => {
    

  return (
      <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
          <Link href={`/programs/${program._id}`} style={{ backgroundImage: `url(${program.imageUrl})` }} className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'>  </Link>

          <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
              <div className='flex gap-2 justify-between'>
                  <p className='p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 truncate'>
                      {program.university.name}
                  </p>
                  <span className='p-semibold-14 w-max rounded-full bg-green-100 px-4 py-1 text-green-60 truncate'>
                      {program.duration}
                  </span>
              </div>
              <p className='p-medium-16 p-medium-18 text-grey-500 flex items-center justify-between'>
                  {program.deliveryMode}
                  <Button className='button rounded-full' onClick={() => addToComparison(program)}>Compare</Button>
              </p>
              <p className='p-semibold-18 md:p-semibold-20 flex-1 text-black truncate'>
                  {program.programName}
              </p>
              <p className='p-medium-16 md:p-medium-18  text-black truncate'>
                  {program.programDescription}
              </p>
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

export default CompareCard