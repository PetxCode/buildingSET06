import mongoose from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  token: string;
  OTP: string;
  companyName: string;
  verified: boolean;
  company: {};
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    OTP: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admins",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("users", userModel);
