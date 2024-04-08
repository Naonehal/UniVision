import { model, models, Schema } from "mongoose";

export interface IProgram extends Document {
    _id: string;
    university: { _id: string, name: string }; // Assuming 'University' is a model and its type is string
    place: string;
    programName: string;
    degreeType: string;
    faculty: string;
    programDescription: string;
    courseRequirements?: string; // Optional field
    admissionRequirements?: string; // Optional field
    tuitionFeesDomestic: string;
    duration: string;
    deliveryMode?: string; // Optional field
    'Co-op/Internship'?: string; // Optional field with a special character in the field name
    imageUrl: string;
    admin: { _id: string, firstName: string, lastName: string }
}

const ProgramSchema = new Schema({
    university: {type : Schema.Types.ObjectId, ref: 'University'},
    place: {type: String, required: true},
    programName: {type: String, required: true},
    degreeType: {type: String, required: true},
    faculty: {type: String, required: true},
    programDescription: {type: String, required: true},
    courseRequirements: {type: String},
    admissionRequirements: {type: String},
    tuitionFeesDomestic: {type: String, required: true},
    duration: {type: String, required: true},
    imageUrl: {type: String, required: true},
    deliveryMode: {type: String},
    'Co-op/Internship': { type: String },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Program = models.Program || model('Program', ProgramSchema);

export default Program;