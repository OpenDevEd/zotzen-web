import mongoose, { Schema } from 'mongoose';
const outputSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    linkToLibrary: {
      type: String,
      required: true,
    },
    doi: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('Output', outputSchema);
