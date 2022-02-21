import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhotoURL: String,
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      defaultValue: "Standard",
    },
  },
  { timestamps: true }
);
userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
  const self = this;
  const newDocument = doc;
  return new Promise((resolve, reject) => {
    return self
      .findOne(condition)
      .then((result) => {
        if (result) {
          return resolve(result);
        }
        return self
          .create(newDocument)
          .then((result) => {
            return resolve(result);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export default mongoose.model("User", userSchema);
