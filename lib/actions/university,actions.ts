"use server"

import { CreateUniversityParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import University from "../database/models/university.model"

export const createUniversity = async ({universityName}: CreateUniversityParams) => {
    try {
        await connectToDatabase();

        const newUniversity = await University.create({ name: universityName })
        
        return JSON.parse(JSON.stringify(newUniversity));
    } catch (error) {
        handleError(error)
    }
}

export const getAllUniversities = async () => {
    try {
        await connectToDatabase();

        const universities = await University.find()
        
        return JSON.parse(JSON.stringify(universities));
    } catch (error) {
        handleError(error)
    }
}