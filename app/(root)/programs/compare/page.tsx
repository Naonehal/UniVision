'use client'

import CompareCollection from "@/components/shared/CompareCollection";
import { getAllPrograms } from "@/lib/actions/program.actions";
import { IProgram } from "@/lib/database/models/program.model";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchParamProps } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const CompareProgram = ({ params: { id },searchParams }: SearchParamProps) => {
    const [selectedPrograms, setSelectedPrograms] = React.useState<IProgram[]>([]);
    const [programs, setPrograms] = React.useState<IProgram[]>([]);
    const [page, setPage] = React.useState<number>(1);
  const limit = 6; // Set your desired limit for programs per page
  const page2 = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const university = (searchParams?.university as string) || "";
    // Fetch programs from your API and set them to the `programs` state
  const [totalProgramsCount, setTotalProgramsCount] = useState(0); // Define the totalProgramsCount state


  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await getAllPrograms({
        query: '', 
        university: '', 
        page: page2,
        limit: limit,
      });

      setPrograms(response?.data); // Assuming response.data contains the programs
      setTotalProgramsCount(response?.totalPages * limit); // Update the totalProgramsCount
    };

    fetchPrograms();
  }, [page2]);

    const addToComparison = (program: IProgram) => {
    setSelectedPrograms(prevPrograms => {
      // Check if the program is already in the list or if 3 programs have been added
      const isExisting = prevPrograms.find(p => p._id === program._id);
      const canAddMore = prevPrograms.length < 3;
      if (!isExisting && canAddMore) {
        return [...prevPrograms, program];
      } else {
        return prevPrograms; // Return the previous list without changes
      }
    });
  };
  
    return (
      <>
        <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>
            Compare Programs
          </h3>
          <Button asChild className='button hidden sm:flex'>
            <Link
              href="/#programs">
                View More Programs
              </Link>
          </Button>
          </div>
      </section>
        {/* Collection of Cards */}
        <section className="wrapper my-8 felx flex-col gap-8 md:gap-12">

            <CompareCollection 
                data={programs} 
                addToComparison={addToComparison} 
                emptyTitle="No Programs Found" // Provide a title for when no programs are found
                emptyStateSubtext="Try adjusting your search criteria" // Provide some subtext for the empty state
                limit={limit} 
                page={page2} 
                totalPages={Math.ceil(totalProgramsCount / limit)} // Calculate total pages based on fetched programs
            />
        </section>

        {/* Comparison Table */}
            {selectedPrograms.length > 0 && (
          <div className="wrapper overflow-x-auto">
            <h3 className='h3-bold text-center'>
            Comparison Table
          </h3>
              <Table>
                <TableCaption className="p-medium-14 text-grey-500">Program Comparison</TableCaption>
                <TableHeader>
                  <TableRow className="border-b">
                  {/* <TableHead className="py-3 text-left">Attributes</TableHead> */}
                    <TableCell className="min-w-[250px] py-4 text-left p-bold-20">Program Name</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="min-w-[200px] py-4 text-left">{program.programName}</TableCell>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b">
                    <TableCell className="min-w-[250px] py-4 text-left p-bold-20">University</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.university.name}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Place</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.place}</TableCell>
                    ))}
                  </TableRow>
                  {/* Degree Type */}
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Degree Type</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.degreeType}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Faculty</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.faculty}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Program Description</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.programDescription}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Course Requirements</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.courseRequirements}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Admission Requirements</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.admissionRequirements}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Tuition Fees(Domestic)</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.tuitionFeesDomestic}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Duration</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.duration}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Delivery Mode</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program.deliveryMode}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="py-4 text-left p-bold-20">Co-op/Internship</TableCell>
                    {selectedPrograms.map(program => (
                      <TableCell key={program._id} className="py-4">{program['Co-op/Internship']}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </>
    );
};

export default CompareProgram;
