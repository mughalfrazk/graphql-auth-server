import mongoose from "mongoose";
import uniqueValidators from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
});

userSchema.plugin(uniqueValidators);

module.exports = mongoose.model("User", userSchema);
