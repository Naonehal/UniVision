// save.model.ts
import mongoose, { Document, model, Model, Schema } from 'mongoose';

interface ISave extends Document {
  user: string;
  program: mongoose.Schema.Types.ObjectId;
  savedAt: Date;
}

const saveSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  savedAt: { type: Date, default: Date.now },
});

const Save: Model<ISave> = mongoose.models.Save || model<ISave>('Save', saveSchema);

export default Save;
