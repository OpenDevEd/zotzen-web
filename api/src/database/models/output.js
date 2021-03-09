import mongoose, { Schema } from "mongoose";
const outputSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
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
    },
    citation: {
      type: String,
    },
    authors: {
      type: [{ lastName: String, firstName: String }],
    },
    category: {
      type: { key: String, name: String },
    },
    reportNumber: {
      type: String,
    },
    date: {
      type: Date,
    },
    workingDocURL: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Output", outputSchema);
