"use client"

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import { getAllUniversities } from '@/lib/actions/university,actions';
import { IUniversity } from '@/lib/database/models/university.model';

const UniversityFilter = () => {
     const [universities, setUniversities] = useState<IUniversity[]>([]);
    const router = useRouter()
    const searchParams = useSearchParams();

     useEffect(() => {
    const getUniversities = async () => {
      const universityList = await getAllUniversities()

      universityList && setUniversities(universityList as IUniversity[])
    }

    getUniversities();
  }, [])

    // useEffect(() => { 
    //     const delayDebounceFn = setTimeout(() => {
    //         let newUrl = ''
    //         if (universities) {
    //             newUrl = formUrlQuery({
    //                 params: searchParams.toString(),
    //                 key: 'query',
    //                 value: universities
    //             })
    //         }
    //         else {
    //             newUrl = removeKeysFromQuery({
    //                 params: searchParams.toString(),
    //                 keysToRemove: ['query'],
    //             })
    //         }

    //         router.push(newUrl, {scroll: false})

    //     }, 400)

    //     return () => clearTimeout(delayDebounceFn);
    // }, [universities, searchParams, router])

    const onSelectUniversity = (university: string) => {
            let newUrl = ''
            if (university && university !== 'All') {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'university',
                    value: university
                })
            }
            else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ['university'],
                })
            }

            router.push(newUrl, {scroll: false})
    }
  return (
    <Select onValueChange={(value: string) => onSelectUniversity(value) }>
    <SelectTrigger className="select-field">
        <SelectValue placeholder="University" />
    </SelectTrigger>
    <SelectContent>
              <SelectItem value="All" className='select-item p-regular-14' >All</SelectItem>
              {universities.map((university) => (
                  <SelectItem value={university.name} key={university._id} className='select-item p-regular-14' >
                      {university.name}
                  </SelectItem>
              )
            )}
    </SelectContent>
    </Select>
  )
}

export default UniversityFilter