import express, { Application } from "express";
import { mainApp } from "./mainApp";
import mongoose from "mongoose";

const app: Application = express();
const port: number = 7788;

mongoose
  .connect(
    "mongodb+srv://shecodesaj:shecodesaj@cluster0.xe1jgnf.mongodb.net/set06DB",
  )
  .then(() => {
    mainApp(app);
    const server = app.listen(port, () => {
      console.log("server up and running!");
    });

    process.on("uncaughtException", (err: Error) => {
      console.log("shuttin down server bcos: uncaughtException");
      console.log(err);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason: any) => {
      console.log("shuttin down server bcos: unhandledRejection");
      console.log(reason);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
