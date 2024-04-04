import { model, models, Schema } from "mongoose";

export interface IUniversity extends Document {
    _id: string;
    name: string;
}

const UniversitySchema = new Schema({
    name: {type: String, required: true, unique: true},
})

const University = models.University || model('University', UniversitySchema)

export default University