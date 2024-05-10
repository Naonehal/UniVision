import { IProgram } from '@/lib/database/models/program.model'
import React from 'react'
import Pagination from './Pagination'
import CompareCard from './CompareCard'

type CollectionProps = {
    data: IProgram[],
    emptyTitle: string,
    emptyStateSubtext: string,
    urlParamName?: string,
    limit: number,
    page: number| string,
    totalPages?: number,
    collectionType?: 'All_Programs' | 'Saved_Programs'
    addToComparison: (program: IProgram) => void;}

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
      <>
          {data.length > 0 ? (
              <div className='flex flex-col items-center gap-10'>
                  <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                      {data.map((program) => {
                          return (
                              <li key={program._id} className='flex justify-center'>
                                  <CompareCard program={program} addToComparison={addToComparison} />
                            </li>
                          )
                      })}
                  </ul>
                  {totalPages > 1 && (
                      <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages} />
                  ) }
              </div>
          ) : (
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

export default CompareCollection