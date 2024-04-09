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
  userId: string
  program: {
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
  'Co-op/Internship'?: string;
  imageUrl: string;
  }
};

export type UpdateProgramParams = {
  userId: string
  program: {
    _id: string;
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
  'Co-op/Internship'?: string;
  imageUrl: string;
  }
};

export type DeleteProgramParams = {
    programId: string;
};

export type GetAllProgramsParams = {
    query: string; 
    university: string; 
    faculty?: string; 
    degreeType?: string; 
    limit: number; 
    page: number; 
};


export type GetProgramsByUniversityParams = {
  programName: string;
  programId: string;
    limit?: number;
    page: number | string;
};

export type getSavedProgramsForUserParams = {
  programIds: string[];
    limit?: number;
    page: number | string;
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
  'Co-op/Internship'?: string;
  imageUrl: string;
};

export type GetProgramsByUserParams = {
  
  userId: string | null
  limit?: number
  page: string | number | null
}


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