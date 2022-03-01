import mongoose, { Schema } from 'mongoose';

const loginActivitySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('loginActivity', loginActivitySchema);
