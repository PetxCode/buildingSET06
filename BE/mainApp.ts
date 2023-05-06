import express, { Application } from "express";
import cors from "cors";
import game from "./router/gameRouter";
import auth from "./router/authRouter";
import admin from "./router/adminRoute";
import pay from "./router/myTest";

export const mainApp = (app: Application) => {
  app
    .use(cors())
    .use(express.json())
    .use("/api/auth", auth)
    .use("/api/game", game)
    .use("/api/pay", pay)
    .use("/api/admin", admin);
};
