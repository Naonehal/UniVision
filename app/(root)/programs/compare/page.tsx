'use client'

import CompareCollection from "@/components/shared/CompareCollection";
import { getAllPrograms } from "@/lib/actions/program.actions";
import { IProgram } from "@/lib/database/models/program.model";
import React from "react";
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

    // Fetch programs from your API and set them to the `programs` state
    React.useEffect(() => {
        const fetchPrograms = async () => {
            const allPrograms = await getAllPrograms({
              query: '',
              university: '',
              page: parseInt(searchParams.page as string, 10),
              limit: 6
            });
            setPrograms(allPrograms?.data); // Adjust according to the actual response structure
        };

        fetchPrograms();
    }, [page]);

    const addToComparison = (program: IProgram) => {
        setSelectedPrograms(prevPrograms => [...prevPrograms, program]);
  };
  
  console.log(selectedPrograms);

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
                page={page} 
                totalPages={Math.ceil(programs.length / limit)} // Calculate total pages based on fetched programs
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
