import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IUniversity } from "@/lib/database/models/university.model"
import { startTransition, useEffect, useState } from "react"
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
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createUniversity, getAllUniversities } from "@/lib/actions/university,actions"



type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}
const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [universities, setUniversities] = useState<IUniversity[]>([])
    const [newUniversity, setNewUniversity] = useState('')
    const handleAddUniversity = () => {
      createUniversity({
          universityName: newUniversity.trim()
      })
        .then((university) => {
        setUniversities((prevState) => [...prevState, university])
      })
  }

  useEffect(() => {
    const getUniversities = async () => {
      const universityList = await getAllUniversities()

      universityList && setUniversities(universityList as IUniversity[])
    }

    getUniversities();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
            <SelectValue placeholder="University" />
        </SelectTrigger>
        <SelectContent>
              {universities.length > 0 && universities.map((university) => (
                  <SelectItem key={university._id} value={university._id} className="select-item p-regular-14">
                      {university.name}
                </SelectItem>
              ))}
            <AlertDialog>
                <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new university</AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                    <AlertDialogTitle>New University</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input type="text" placeholder="University Name" className="input-field mt-3" onChange={(e) => setNewUniversity(e.target.value)}/>
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => startTransition(handleAddUniversity)}> Add </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </SelectContent>
    </Select>
  )
}

export default Dropdown