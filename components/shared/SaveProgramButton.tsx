'use client'

import { IProgram } from '@/lib/database/models/program.model'
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import SaveProgram from './Saveprogram';

const SaveProgramButton = ({ program }: { program: IProgram }) => {
    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;

  return (
      <div className='flex items-center gap-3'>
        <>
            <SignedOut>
                <Button asChild className='button rounded-full' size="lg">
                    <Link href="/sign-in">
                        Save Program
                    </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                  <SaveProgram program = {program} userId={userId} />
              </SignedIn>
        </>
    </div>
  )
}

export default SaveProgramButton