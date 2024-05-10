// Importing necessary modules and components
'use client'
import { useTransition } from 'react' // Importing useTransition hook from React
import { usePathname } from 'next/navigation' // Importing usePathname hook from Next.js navigation
import Image from 'next/image' // Importing Image component from Next.js

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog' // Importing components from the alert-dialog UI component

import { deleteProgram } from '@/lib/actions/program.actions' // Importing deleteProgram action

// Define props type for DeleteConfirmation component
export const DeleteConfirmation = ({ programId }: { programId: string }) => {
  const pathname = usePathname() // Get the current pathname
  let [isPending, startTransition] = useTransition() // Initialize useTransition hook

  return (
    // Render an alert dialog
    <AlertDialog>
      {/* Trigger for the alert dialog */}
      <AlertDialogTrigger>
        <Image src="/assets/icons/delete.svg" alt="edit" width={20} height={20} /> {/* Display delete icon */}
      </AlertDialogTrigger>

      {/* Content of the alert dialog */}
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle> {/* Title of the alert dialog */}
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this program {/* Description of the alert dialog */}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer of the alert dialog */}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel> {/* Cancel button */}

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteProgram({ programId }) // Delete program action
              })
            }>
            {isPending ? 'Deleting...' : 'Delete'} {/* Display delete action status */}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
