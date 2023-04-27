import express, { Router } from "express";
import { createGames, getGames } from "../controller/gameController";
import { auth } from "../auth";

const router: Router = express.Router();

router.route("/").get(auth, getGames);
router.route("/create").post(auth, createGames);

export default router;
