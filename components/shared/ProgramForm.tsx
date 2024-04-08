'use client'

import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { programFormSchema } from "@/lib/validator"
import { z } from "zod"
import { programDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import { useUploadThing } from "@/lib/uploadthing"
import Image from "next/image"
import { Router } from "lucide-react"
import { useRouter } from "next/navigation"
import { createProgram, updateProgram } from "@/lib/actions/program.actions"
import { IProgram } from "@/lib/database/models/program.model"




type ProgramFormProps = {
    type: "Create" | "Update"
    userId: string
    program?: IProgram,
    programId?: string
}

const ProgramForm = ({ type, userId, program, programId }: ProgramFormProps) => {
    const [files, setFiles] = useState<File[]>([])
    const initialValues = program && type ==='Update' ? {...program}: programDefaultValues;
    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof programFormSchema>>({
    resolver: zodResolver(programFormSchema),
    defaultValues: initialValues
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof programFormSchema>) {
      let uploadedImageUrl = values.imageUrl;

      if (files.length > 0) {
          const uploadedImgaes = await startUpload(files);

          if (!uploadedImgaes) {
              return
          }

          uploadedImageUrl = uploadedImgaes[0].url
      }

      if (type === 'Create') {
          try {
              const newProgram = await createProgram({
                  program: { ...values, imageUrl: uploadedImageUrl }, userId
              })

              if (newProgram) {
                  form.reset();
                  router.push(`/programs/${newProgram._id}`)
              }
          } catch (error) {
              console.log(error);
          }
      }
      if (type === 'Update') {
          {
              if (!programId) {
                  router.back()
                  return;
              }
          }
          try {
              const updatedProgram = await updateProgram({
                  userId,
                  program: { ...values, imageUrl: uploadedImageUrl, _id: programId },
                  
              })

              if (updatedProgram) {
                  form.reset();
                  router.push(`/programs/${updatedProgram._id}`)
              }
          } catch (error) {
              console.log(error);
          }
      }
  }
  return (
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="programName"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                            <Input placeholder= "Program Name" {...field} className="input-field"/>
                            
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="universityId"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Dropdown onChangeHandler = {field.onChange} value = {field.value} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
              </div>

              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="programDescription"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl className="h-72">
                            <Textarea placeholder="Description" {...field} className="textarea rounded-2xl"/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl className="h-72">
                                <FileUploader onFieldChange={field.onChange}
                                    imageUrl={field.value}
                                    setFiles={setFiles} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              </div>

              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                    <Image
                                        src="/assets/icons/location-grey.svg"
                                        alt="location"
                                        width={24}
                                        height={24}
                                    className="w-8 h-8 " />
                                    <Input placeholder="University Location" {...field} className="input-field"/>
                                </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                  />
              </div>
              
              <div className="flex flex-col gap-5 md:flex-row">
                  <FormField
                control={form.control}
                name="degreeType"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Program Type" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="faculty"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Faculty" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
                </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="deliveryMode"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Program Delivery Mode" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="courseRequirements"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Program Requirements" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="admissionRequirements"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Admission Requirements" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="tuitionFeesDomestic"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image
                                        src="/assets/icons/dollar.svg"
                                        alt="dollar"
                                        width={24}
                                        height={24}
                                    className="w-8 h-8 " />
                                <Input placeholder="Tuition Fees Domestic" {...field} className="input-field"/>
                            </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  />  
              </div>
              <div className="flex flex-col gap-5 md:flex-row">
                <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormControl>
                            <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                                <Image
                                        src="/assets/icons/calendar.svg"
                                        alt="calender"
                                        width={24}
                                    height={24}
                                    className="filter-grey w-8 h-8"
                                    />
                                <Input placeholder="Program Duration" {...field} className="input-field" />
                            </div>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                  /> 
              </div>
              <div className="flex flex-col gap-5 md:flex-row">  
                <FormField
                control={form.control}
                name="Co-op/Internship"
                render={({ field }) => (
                    <FormItem className="w-full">
                    <FormControl>
                        <Input placeholder="Co-op/Internship" {...field} className="input-field"/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />  
              </div>

              <Button type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="button col-span-2 w-full">{form.formState.isSubmitting ? ('Submitting...'): `${type} Program`}</Button>
      </form>
    </Form>
  )
}

export default ProgramForm