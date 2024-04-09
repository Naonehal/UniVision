// save.actions.ts
"use server"

import { getSavedProgramsForUserParams } from "@/types";
import { connectToDatabase } from "../database";
import Program, { IProgram } from "../database/models/program.model";
import Save from "../database/models/save.model";
import University from "../database/models/university.model";
import { handleError } from "../utils";

const populateProgram = async (query:any) => {
    return query
    .populate({path: 'program', model: Program})
}


export const saveProgramForUser = async (userId: string, programId: string) => {
  try {
    await connectToDatabase();

    // Check if the program is already saved by the user to avoid duplicates
    
    const existingSave = await Save.findOne({ user: userId, program: programId });
    if (existingSave) {
      throw new Error("Program is already saved.");
    }
    const save = await Save.create({ user: userId, program: programId });
    return JSON.parse(JSON.stringify(save));
  } catch (error) {
    handleError(error);
  }
};

export const checkIfProgramIsSaved = async (userId: string, programId: string): Promise<boolean> => {
  try {
    await connectToDatabase();

    // Check if there's a saved program matching the userId and programId
    const existingSave = await Save.findOne({ user: userId, program: programId });
    return !!existingSave; // Convert to boolean: true if saved, false otherwise
  } catch (error) {
    handleError(error);
    return false; // In case of error, assume not saved
  }
};

export const deleteSavedProgram = async (userId: string, programId: string): Promise<void> => {
  try {
    await connectToDatabase();

    // Delete the save entry
    await Save.findOneAndDelete({ user: userId, program: programId });
  } catch (error) {
    handleError(error);
  }
};

export const getProgramIdsByUserId = async (userId: string): Promise<string[]> => {
  try {
    await connectToDatabase();

    // Find all 'Save' documents for the given userId
    const savedDocuments = await Save.find({ user: userId }).select('program');

    // Map over the documents to extract the program IDs
    const programIds = savedDocuments.map((doc) => doc.program.toString());

    return programIds;
  } catch (error) {
    handleError(error);
    return []; // Return an empty array in case of an error
  }
};

export async function getSavedProgramsForUser({
  programIds,
  limit = 3,
  page = 1,
}: getSavedProgramsForUserParams) {
  try {
    await connectToDatabase();
    
    const skipAmount = (Number(page) - 1) * limit;

    // Use the $in operator to find programs whose _id is in the programIds array
    const programsQuery = Program.find({
      '_id': { $in: programIds } // This condition selects documents whose _id is in the programIds array
    })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .limit(limit)
    .populate('university'); // Populate any fields as needed, such as 'university'

    const programs = await programsQuery.exec();

    const programsCount = await Program.countDocuments({
      '_id': { $in: programIds }
    });

    return {
      data: JSON.parse(JSON.stringify(programs)), // Contains full program details
      totalPages: Math.ceil(programsCount / limit)
    };
  } catch (error) {
    handleError(error);
  }
};

