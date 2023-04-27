import mongoose from "mongoose";

interface iGame {
  name: string;
  detail: string;
}

interface iGameData extends iGame, mongoose.Document {}

const gameModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    detail: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<iGameData>("games", gameModel);
