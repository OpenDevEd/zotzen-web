import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const loginActivitySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("loginActivity", loginActivitySchema);
