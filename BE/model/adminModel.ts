import mongoose from "mongoose";

interface iUser {
  companyName: string;
  email: string;
  password: string;
  token: string;
  verified: boolean;
  staff: {}[];
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema(
  {
    companyName: {
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
    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<iUserData>("admins", userModel);
