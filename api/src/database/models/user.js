import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
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
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator, {
  message: 'The {PATH} provided is already taken.',
});

userSchema.set('toJSON', {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

export default mongoose.model('User', userSchema);
