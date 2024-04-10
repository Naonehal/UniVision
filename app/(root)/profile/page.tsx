import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProgramIdsByUserId, getSavedProgramsForUser } from '@/lib/actions/save.actions';
import { auth } from '@clerk/nextjs';
import { SearchParamProps } from '@/types';
import { IProgram } from '@/lib/database/models/program.model';

const ProfilePage = async ( { params: { id },searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const programIds = await getProgramIdsByUserId(userId);

  const result = await getSavedProgramsForUser({
  programIds: programIds, // Pass the array of programIds to getSavedProgramsForUser
  page: parseInt(searchParams.page as string, 10), // Make sure to parse the page number to an integer
  limit: 6 // Or any other limit you wish to apply
});
  // console.log(result)

  // Transform savedPrograms into an array of IProgram objects

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>
            My Saved Programs
          </h3>
          <Button asChild className='button hidden sm:flex'>
            <Link
              href="/#programs">
                View More Programs
              </Link>
          </Button>
        </div>
      </section>
      <Collection
          data={result?.data}
          emptyTitle ="No program saved yet."
          emptyStateSubtext="no worries - Explore more programs!"
          collectionType="Saved_Programs"
          limit={3}
          page={searchParams.page as string}
        totalPages={result?.totalPages}  
        />
    </>
  )
}

export default ProfilePage
