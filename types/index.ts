// types.ts

export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PROGRAM PARAMS
export type CreateProgramParams = {
    universityId: string;
    place: string;
    programName: string;
    degreeType: string;
    faculty: string;
    programDescription: string;
    courseRequirements?: string;
    admissionRequirements?: string;
    tuitionFeesDomestic: string;
    duration: string;
    deliveryMode?: string;
    coOpInternship?: string;
};

export type UpdateProgramParams = {
    programId: string;
    universityId?: string;
    place?: string;
    programName?: string;
    degreeType?: string;
    faculty?: string;
    programDescription?: string;
    courseRequirements?: string;
    admissionRequirements?: string;
    tuitionFeesDomestic?: string;
    duration?: string;
    deliveryMode?: string;
    coOpInternship?: string;
};

export type DeleteProgramParams = {
    programId: string;
};

export type GetAllProgramsParams = {
    query?: string; // Optional search query that might be used to filter programs by name, faculty, etc.
    universityId?: string; // Optional filter to get programs from a specific university
    faculty?: string; // Optional filter to get programs from a specific faculty
    degreeType?: string; // Optional filter to categorize by degree type (e.g., Bachelor's, Master's)
    limit?: number; // Optional limit on the number of programs to fetch
    page?: number; // Optional page number for pagination
};


export type GetProgramsByUniversityParams = {
    universityId: string;
    limit?: number;
    page: number;
};

export type GetProgramsByFacultyParams = {
    faculty: string;
    limit?: number;
    page: number;
};

export type Program = {
    _id: string;
    university: { _id: string, name: string };
    place: string;
    programName: string;
    degreeType: string;
    faculty: string;
    programDescription: string;
    courseRequirements?: string;
    admissionRequirements?: string;
    tuitionFeesDomestic: string;
    duration: string;
    deliveryMode?: string;
    coOpInternship?: string;
};


// ====== University PARAMS
export type CreateUniversityParams = {
  universityName: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}