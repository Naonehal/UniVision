// Importing necessary modules and components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" // Importing components from select UI component
import { IUniversity } from "@/lib/database/models/university.model" // Importing University interface
import { startTransition, useEffect, useState } from "react" // Importing hooks from React
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
} from "@/components/ui/alert-dialog" // Importing components from alert-dialog UI component
import { Input } from "../ui/input" // Importing Input component
import { createUniversity, getAllUniversities } from "@/lib/actions/university.actions" // Importing actions for university

// Define props type for Dropdown component
type DropdownProps = {
    value?: string // Optional value
    onChangeHandler?: () => void // Optional change handler function
}

// Dropdown component definition
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    // State to store universities list and new university name
    const [universities, setUniversities] = useState<IUniversity[]>([])
    const [newUniversity, setNewUniversity] = useState('')

    // Function to handle adding new university
    const handleAddUniversity = () => {
      // Create university with provided name
      createUniversity({
          universityName: newUniversity.trim()
      })
        .then((university) => {
        // Update universities list with the newly created university
        setUniversities((prevState) => [...prevState, university])
      })
  }

  // Effect to fetch universities list on component mount
  useEffect(() => {
    const getUniversities = async () => {
      // Fetch list of all universities
      const universityList = await getAllUniversities()

      // Update state with the fetched list of universities
      universityList && setUniversities(universityList as IUniversity[])
    }

    // Invoke the function to fetch universities
    getUniversities();
  }, [])

  return (
    // Render a select dropdown
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="University" />
        </SelectTrigger>
        <SelectContent>
              {/* Render options for existing universities */}
              {universities.length > 0 && universities.map((university) => (
                  <SelectItem key={university._id} value={university._id} className="select-item p-regular-14">
                      {university.name}
                </SelectItem>
              ))}
            {/* Render an alert dialog to add new university */}
            <AlertDialog>
                <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new university</AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>New University</AlertDialogTitle>
                    <AlertDialogDescription>
                        {/* Input field for new university name */}
                        <Input type="text" placeholder="University Name" className="input-field mt-3" onChange={(e) => setNewUniversity(e.target.value)}/>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* Button to add the new university */}
                    <AlertDialogAction onClick={() => startTransition(handleAddUniversity)}> Add </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </SelectContent>
    </Select>
  )
}

export default Dropdown // Export the Dropdown component
