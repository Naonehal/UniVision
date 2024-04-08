import * as z from "zod"

export const programFormSchema = z.object({
    programName: z.string().min(3, 'Program must be at least 3 characters.'),
    programDescription: z.string().min(3, 'programDescription must be at least 3 characters.').max(800, 'Description must be less than 800 characters'),
    place: z.string().min(3, 'Place must be at least 3 characters.').max(800, 'Place must be less than 800 characters'),
    degreeType: z.string(),
    faculty: z.string(),
    courseRequirements: z.string(),
    admissionRequirements: z.string(),
    tuitionFeesDomestic: z.string(),
    duration: z.string(),
    deliveryMode: z.string(),
    'Co-op/Internship': z.string(),
    universityId: z.string(),
    imageUrl: z.string(),
})

