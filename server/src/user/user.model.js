import mongoose from "mongoose";


const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already registered"],
  },
  billingID: String,
  plan: { type: String, enum: ["none", "basic", "pro"], default: "none" },
  hasTrial: { type: Boolean, default: false },
  endDate: { type: Date, default: null },
  firstName: String,
  lastName: String,
  profilePhoto: String,
  password: String,
  username: String,
  source: { type: String, required: [true, "source not specified"] },
  lastVisited: { type: Date, default: new Date() },
  tokenBalance: { type: Number, default: 10 },
});

const userModel = mongoose.model("user", userSchema, "user");

export default userModel;
