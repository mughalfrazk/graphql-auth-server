import mongoose from "mongoose";
import uniqueValidators from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const loginLogsSchema = new Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  timestamp: { type: Date, required: true }
});

loginLogsSchema.plugin(uniqueValidators);

module.exports = mongoose.model("LoginLog", loginLogsSchema);
