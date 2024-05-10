import Collection from '@/components/shared/Collection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProgramIdsByUserId, getSavedProgramsForUser } from '@/lib/actions/save.actions';
import { auth } from '@clerk/nextjs';
import { SearchParamProps } from '@/types';
import { IProgram } from '@/lib/database/models/program.model';

const ProfilePage = async ({ params: { id }, searchParams }: SearchParamProps) => {
  // Authenticate user
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  
  // Extract page, search text, and university from searchParams
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const university = (searchParams?.university as string) || "";
  
  // Get saved program ids for the user
  const programIds = await getProgramIdsByUserId(userId);
  
  // Fetch saved programs based on user's saved program ids
  const result = await getSavedProgramsForUser({
    programIds: programIds,
    page: page,
    limit: 6
  });

  return (
    <>
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>
            My Saved Programs
          </h3>
          <Button asChild className='button hidden sm:flex'>
            <Link href="/#programs">
              View More Programs
            </Link>
          </Button>
        </div>
      </section>
      <section id="programs" className="wrapper my-8 felx flex-col gap-8 md:gap-12">
        <Collection
          data={result?.data}
          emptyTitle="No program saved yet."
          emptyStateSubtext="No worries - Explore more programs!"
          collectionType="Saved_Programs"
          limit={3}
          page={page}
          totalPages={result?.totalPages}  
        />
      </section>
    </>
  )
}

export default ProfilePage;
