import mongoose from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  token: string;
  verified: boolean;
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("users", userModel);
