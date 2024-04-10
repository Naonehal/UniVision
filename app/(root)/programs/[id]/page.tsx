import Collection from '@/components/shared/Collection';
import SaveProgramButton from '@/components/shared/SaveProgramButton';
import { getProgramById, getRelatedProgramsByUniversity } from '@/lib/actions/program.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'

const ProgramDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    const program = await getProgramById(id);
    
    const relatedPrograms = await getRelatedProgramsByUniversity({
        programName: program.programName,
        programId: program._id,
        page: searchParams.page as string,
    })
    return (
      <>
      <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
              <Image
                  src={program.imageUrl}
                  alt="hero image"
                  width={1000}
                  height={1000}
                  className='h-full min-h-[300px] object-cover object-center' 
              />
              <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                  <div className='flex flex-col gap-6'>
                      <h2 className='h2-bold'>{program.programName}</h2>
                      <div className='flex flex-wrap gap-3 sm:flex-row sm:items-center'>
                          <div className='flex gap-3'>
                              
                              <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700 flex items-center'>
                                  <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} className='px-1'/>
                                  {program.duration}  
                              </p>
                              <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
                                  {program.deliveryMode}    
                              </p>
                          </div>
                          <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                              Offered by{' '}
                              <span className='text-green-700'>
                                  {program.university.name}
                              </span>
                          </p>
                          <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                              Program Type: {' '}
                              <span className='text-green-700'>
                                  {program.degreeType}
                              </span>
                          </p>
                          <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                              Faculty: {' '}
                              <span className='text-green-700'>
                                  {program.faculty}
                              </span>
                          </p>
                          <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                              Tuition Fees Domestic: {' '}
                              <span className='text-green-700'>
                                  {program.tuitionFeesDomestic}
                              </span>
                          </p>
                      </div>
                        </div>
                    <SaveProgramButton program = {program}/>
                  <div className='flex flex-col gap-5'>
                      <div className='p-regular-20 flex items-center gap-3'>
                          <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                          <p className='p-medium-16 lg:p-regular-20' >{ program.place }</p>
                      </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                      <p className='p-bold-20 text-grey-600' >
                          What  You’ll Learn: 
                      </p>
                      <p className='p-medium-16 lg:p-regular-18' >
                          { program.programDescription }
                      </p>
                      <p className='p-bold-20 text-grey-600' >
                          Admission Requirements: 
                      </p>
                      <p className='p-medium-16 lg:p-regular-18' >
                          { program.admissionRequirements }
                      </p>
                      <p className='p-bold-20 text-grey-600' >
                          Course Requirements: 
                      </p>
                      <p className='p-medium-16 lg:p-regular-18' >
                          { program.courseRequirements }
                      </p>
                      <p className='p-bold-20 text-grey-600' >
                          Co-op/Internship: 
                      </p>
                      <p className='p-medium-16 lg:p-regular-18' >
                          { program['Co-op/Internship']}
                      </p>
                  </div>
              </div>
          </div>
            </section>
            
      <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
                <h2 className='h2-bold'>
                    Related Programs
                </h2>
                <Collection
                    data={relatedPrograms?.data}
                    emptyTitle ="No Programs Found"
                    emptyStateSubtext="Come Back Later"
                    collectionType="All_Programs"
                    limit={3}
                    page={searchParams.page as string}
                    totalPages={relatedPrograms?.totalPages}  
                />
      </section>
      </>
  )
}

export default ProgramDetails