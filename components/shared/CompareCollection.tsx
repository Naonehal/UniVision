// Importing necessary modules and components
import { IProgram } from '@/lib/database/models/program.model' // Importing Program interface
import React from 'react' // Importing React
import Pagination from './Pagination' // Importing Pagination component
import CompareCard from './CompareCard' // Importing CompareCard component

// Define the props type for the CompareCollection component
type CollectionProps = {
    data: IProgram[], // Array of programs
    emptyTitle: string, // Title for empty state
    emptyStateSubtext: string, // Subtext for empty state
    urlParamName?: string, // Optional URL parameter name
    limit: number, // Limit of programs to display
    page: number | string, // Current page number or string
    totalPages?: number, // Optional total pages
    collectionType?: 'All_Programs' | 'Saved_Programs', // Type of collection
    addToComparison: (program: IProgram) => void; // Function to add program to comparison
}

// CompareCollection component definition
const CompareCollection = ({
    data,
    emptyTitle,
    emptyStateSubtext,
    collectionType,
    limit,
    page,
    totalPages = 0,
    urlParamName,
    addToComparison,
}: CollectionProps) => {
  return (
      // Rendering the compare collection
      <>
          {data.length > 0 ? (
              <div className='flex flex-col items-center gap-10'>
                  {/* Rendering grid of compare cards */}
                  <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                      {data.map((program) => {
                          return (
                              <li key={program._id} className='flex justify-center'>
                                  {/* Rendering CompareCard component for each program */}
                                  <CompareCard program={program} addToComparison={addToComparison} />
                            </li>
                          )
                      })}
                  </ul>
                  {/* Rendering pagination if there are multiple pages */}
                  {totalPages > 1 && (
                      <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                  ) }
              </div>
          ) : (
              // Rendering empty state if data is empty
                  <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                      <h3 className='p-bold-20 md:h5-bold'>
                          {emptyTitle}
                      </h3>
                      <p className='p-regular-14'>
                          {emptyStateSubtext}
                      </p>
                  </div>
          ) }
      </>
  )
}

export default CompareCollection // Exporting the CompareCollection component
