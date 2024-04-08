"use server"

import { CreateProgramParams, DeleteProgramParams, UpdateProgramParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import Program from "../database/models/program.model";
import University from "../database/models/university.model";
import User from "../database/models/user.model";
// import { useRouter } from "next/navigation";


const populateProgram = async (query:any) => {
    return query
    .populate({path: 'university', model: University, select: '_id name'})
}

export const createProgram = async({
    program, userId
}: CreateProgramParams) => {
    try {
        await connectToDatabase();

        const admin = await User.findById(userId)

        console.log({admin: userId})
        const newProgram = await Program.create({ ...program, university: program.universityId, admin: userId });
        return JSON.parse(JSON.stringify(newProgram));
    }
    catch (error) {
        handleError(error)
    }
}

export const getProgramById = async (programId: string) => {
    try {
        await connectToDatabase();
        
        const program = await populateProgram(Program.findById(programId));

        if (!program) {
            throw new Error("No program found with the given id");
        }
        return JSON.parse(JSON.stringify(program))
    } catch (error) {
        handleError(error)
    }
}

export const deleteProgram = async ({programId}: DeleteProgramParams) => {
    try {
        await connectToDatabase();
        
        const deletedprogram = await Program.findByIdAndDelete(programId);

        // if (deletedprogram) {
        //     const router = useRouter();
        //     router.refresh();
        // }
        
    } catch (error) {
        handleError(error)
    }
}

export const getAllPrograms = async ({ limit = 8 }) => {
    try {
        await connectToDatabase();

        const conditions = {};
        
        const programsQuery = Program.find(conditions).skip(0).limit(limit);

        const programs = await populateProgram(programsQuery)
        const programsCount = await Program.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(programs)),
            totalPages: Math.ceil(programsCount / limit),
        }
    } catch (error) {
        handleError(error)
    }
}

// UPDATE
export async function updateProgram({ userId, program}: UpdateProgramParams) {
  try {
    await connectToDatabase()

    const programToUpdate = await Program.findById(program._id)
    if (!programToUpdate || programToUpdate.admin.toHexString() !== userId) {
      throw new Error('Unauthorized or Program not found')
    }

    const updateProgram = await Program.findByIdAndUpdate(
      program._id,
      { ...program, university: program.universityId },
      { new: true }
    )
    // const router = useRouter();
    // router.refresh();

  } catch (error) {
    handleError(error)
  }
}