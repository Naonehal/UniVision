import React from 'react';
import { IProgram } from '@/lib/database/models/program.model'; // Importing Program interface
import Card from './Card'; // Importing Card component
import Pagination from './Pagination'; // Importing Pagination component

// Define the props type for the Collection component
type CollectionProps = {
  data: IProgram[], // Array of programs
  emptyTitle: string, // Title for empty state
  emptyStateSubtext: string, // Subtext for empty state
  urlParamName?: string, // Optional URL parameter name
  limit: number, // Limit of programs to display
  page: number | string, // Current page number or string
  totalPages?: number, // Optional total pages
  collectionType?: 'All_Programs' | 'Saved_Programs' // Type of collection
};

// Collection component definition
const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  limit,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  
  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = (array: IProgram[]) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Shuffle the data before rendering
  const shuffledData = shuffleArray(data);

  return (
    <>
      {shuffledData.length > 0 ? (
        // Render the collection if data is available
        <div className='flex flex-col items-center gap-10'>
          <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
            {shuffledData.map((program) => (
              <li key={program._id} className='flex justify-center'>
                {/* Render Card component for each program */}
                <Card program={program} />
              </li>
            ))}
          </ul>
          {totalPages > 1 && (
            // Render Pagination component if there are multiple pages
            <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
          )}
        </div>
      ) : (
        // Render empty state if data is empty
        <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
          <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
          <p className='p-regular-14'>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection; // Export the Collection component
