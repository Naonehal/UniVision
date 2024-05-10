
import { IProgram } from '@/lib/database/models/program.model'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DeleteConfirmation } from './DeleteConfirmation'



type CardProps = {
    program: IProgram
}

const Card = ({ program }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const isAdmin = userId === program.admin.toString();

  return (
      <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
          <Link href={`/programs/${program._id}`} style={{ backgroundImage: `url(${program.imageUrl})` }} className='flex-center flex-grow bg-grey-50 bg-cover bg-center text-grey-500'>  </Link>
          {isAdmin && (
              <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all'>
                  <Link href={`/programs/${program._id}/update`}>
                      <Image src="/assets/icons/edit.svg" alt="edit" width={20}  height={20} />
                  </Link> 
                  <DeleteConfirmation programId={program._id} />
              </div>
          )}

          <Link href={`/programs/${program._id}`} className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4'>
              <div className='flex gap-2 justify-between'>
                  <p className='p-semibold-14 w-max rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 truncate'>
                      {program.university.name}
                  </p>
                  <span className='p-semibold-14 w-max rounded-full bg-green-100 px-4 py-1 text-green-60 truncate'>
                      {program.duration}
                  </span>
              </div>
              <p className='p-medium-16 p-medium-18 text-grey-500 '>
                  {program.deliveryMode}
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
          </Link>
      </div>
  )
}

export default Card