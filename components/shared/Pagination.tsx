// Importing necessary modules and components
"use client"
import { useRouter, useSearchParams } from 'next/navigation' // Importing useRouter and useSearchParams hooks from Next.js navigation
import React from 'react' // Importing React
import { Button } from '../ui/button' // Importing Button component
import { formUrlQuery } from '@/lib/utils' // Importing formUrlQuery function from utils

// Define props type for Pagination component
type PaginationProps = {
    page: number | string, // Current page number
    totalPages: number, // Total number of pages
    urlParamName?: string // Name of the URL parameter for pagination
}

// Pagination component definition
const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
    // Get the router object
    const router = useRouter()
    // Get the search parameters from the URL
    const searchParams = useSearchParams()

    // Function to handle pagination button click
    const onClick = (btntype: string) => {
        // Calculate the new page value based on button type
        const pageValue = btntype === 'next' ? Number(page) + 1 : Number(page) - 1 
        
        // Form the new URL with updated pagination parameter
        const newUrl = formUrlQuery({
            params: searchParams.toString(), // Convert searchParams to string
            key: urlParamName || 'page', // Use provided URL parameter name or default to 'page'
            value: pageValue.toString(), // Convert page value to string
        })

        // Navigate to the new URL
        router.push(newUrl, { scroll: false }) // Disable scroll behavior
    }

    return (
        // Render pagination buttons
        <div className='flex gap-2'>
            {/* Render Previous button */}
            <Button size="lg" variant="outline" className='w-28' onClick={() => onClick('prev')} disabled={Number(page) <= 1}>
                Previous
            </Button>
            {/* Render Next button */}
            <Button size="lg" variant="outline" className='w-28' onClick={() => onClick('next')} disabled={Number(page) >= totalPages}>
                Next
            </Button>
        </div>
    )
}

export default Pagination // Export the Pagination component
