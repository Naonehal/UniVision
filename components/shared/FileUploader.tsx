// Importing necessary modules and components
'use client'
import { useCallback, Dispatch, SetStateAction } from 'react' // Importing hooks from React
import { FileWithPath } from 'react-dropzone'; // Importing FileWithPath type from react-dropzone
import { useDropzone } from '@uploadthing/react/hooks' // Importing useDropzone hook from UploadThing library
import { generateClientDropzoneAccept } from 'uploadthing/client' // Importing generateClientDropzoneAccept function from UploadThing library

import { Button } from '@/components/ui/button' // Importing Button component
import { convertFileToUrl } from '@/lib/utils' // Importing convertFileToUrl function from utils

// Define props type for FileUploader component
type FileUploaderProps = {
  onFieldChange: (url: string) => void // Callback function when the field changes
  imageUrl: string // URL of the image
  setFiles: Dispatch<SetStateAction<File[]>> // Function to set files
}

// FileUploader component definition
export function FileUploader({ imageUrl, onFieldChange, setFiles }: FileUploaderProps) {
  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Set the dropped files
    setFiles(acceptedFiles)
    // Convert the first dropped file to URL and call onFieldChange callback
    onFieldChange(convertFileToUrl(acceptedFiles[0]))
  }, [])

  // Configuring dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // Accept only image files
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined,
  })

  return (
    // Render the file uploader container
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
      {/* Input element for dropzone */}
      <input {...getInputProps()} className="cursor-pointer" />

      {/* If imageUrl is available, render the uploaded image */}
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="object-cover object-center"
          />
        </div>
      ) : (
        // If no imageUrl, render the dropzone area with upload instructions
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          {/* Button to trigger file selection from computer */}
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileUploader // Export the FileUploader component
