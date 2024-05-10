import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import UniversityFilter from "@/components/shared/UniversityFilter";
import { Button } from "@/components/ui/button";
import { getAllPrograms } from "@/lib/actions/program.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

// Home page component
export default async function Home({ searchParams }: SearchParamProps) {
  // Extract page, search text, and university from searchParams
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const university = (searchParams?.university as string) || "";
  
  // Fetch programs based on search parameters
  const programs = await getAllPrograms({
    query: searchText,
    university,
    page,
    limit: 6
  });

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Explore, Compare, and Choose Your Perfect University Program!</h1>
            <p className="p-regular-20 md:p-regular-24">
              Discover the ideal university program for you. Easily explore and compare a wide range of options to find the perfect fit for your academic journey. Start your educational adventure today.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href='#programs'>
                Explore Now
              </Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            alt="Hero Image"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="wrapper my-8 felx flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Streamline Your Search <br /> with Our User-Friendly Interface</h2>
        {/* Search and University Filter */}
        <div className="flex w-full flex-col gap-5 md:flex-row py-8">
          <Search />
          <UniversityFilter />
        </div>
        {/* Display Collection of Programs */}
        <Collection
          data={programs?.data}
          emptyTitle ="No Programs Found"
          emptyStateSubtext="Come Back Later"
          collectionType="All_Programs"
          limit={8}
          page={page}
          totalPages={programs?.totalPages}  
        />
      </section>
    </>
  );
}
