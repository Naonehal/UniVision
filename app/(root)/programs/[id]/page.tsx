// Import necessary components and functions
import Collection from '@/components/shared/Collection';
import SaveProgramButton from '@/components/shared/SaveProgramButton';
import { getProgramById, getRelatedProgramsByUniversity } from '@/lib/actions/program.actions'
import { SearchParamProps } from '@/types'
import Image from 'next/image';
import React from 'react'

// Define the ProgramDetails component
const ProgramDetails = async ({ params: { id }, searchParams }: SearchParamProps) => {
    // Fetch program details by ID
    const program = await getProgramById(id);
    
    // Fetch related programs by university
    const relatedPrograms = await getRelatedProgramsByUniversity({
        programName: program.programName,
        programId: program._id,
        page: searchParams.page as string,
    })

    // Render the ProgramDetails component
    return (
        <>
            {/* Program details section */}
            <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
                <div className='grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl'>
                    {/* Program image */}
                    <Image
                        src={program.imageUrl}
                        alt="hero image"
                        width={1000}
                        height={1000}
                        className='h-full min-h-[300px] object-cover object-center' 
                    />
                    {/* Program details */}
                    <div className='flex w-full flex-col gap-8 p-5 md:p-10'>
                        <div className='flex flex-col gap-6'>
                            {/* Program name */}
                            <h2 className='h2-bold'>{program.programName}</h2>
                            <div className='flex flex-wrap gap-3 sm:flex-row sm:items-center'>
                                <div className='flex gap-3'>
                                    {/* Program duration */}
                                    <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700 flex items-center'>
                                        <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} className='px-1'/>
                                        {program.duration}  
                                    </p>
                                    {/* Program delivery mode */}
                                    <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>
                                        {program.deliveryMode}    
                                    </p>
                                </div>
                                {/* University name */}
                                <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                    Offered by{' '}
                                    <span className='text-green-700'>
                                        {program.university.name}
                                    </span>
                                </p>
                                {/* Program type */}
                                <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                    Program Type: {' '}
                                    <span className='text-green-700'>
                                        {program.degreeType}
                                    </span>
                                </p>
                                {/* Faculty */}
                                <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                    Faculty: {' '}
                                    <span className='text-green-700'>
                                        {program.faculty}
                                    </span>
                                </p>
                                {/* Tuition fees for domestic students */}
                                <p className='p-medium-18 ml-2 mt-2 sm:mt-0'>
                                    Tuition Fees Domestic: {' '}
                                    <span className='text-green-700'>
                                        {program.tuitionFeesDomestic}
                                    </span>
                                </p>
                            </div>
                        </div>
                        {/* Save program button */}
                        <SaveProgramButton program = {program}/>
                        {/* Location */}
                        <div className='flex flex-col gap-5'>
                            <div className='p-regular-20 flex items-center gap-3'>
                                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                                <p className='p-medium-16 lg:p-regular-20' >{ program.place }</p>
                            </div>
                        </div>
                        {/* Program details */}
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
            
            {/* Related programs section */}
            <section className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
                <h2 className='h2-bold'>
                    Related Programs
                </h2>
                {/* Collection of related programs */}
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
