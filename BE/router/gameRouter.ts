import express, { Router } from "express";
import { createGames, getGames } from "../controller/gameController";
import { auth } from "../auth";

const router: Router = express.Router();

router.route("/").get(getGames);
router.route("/create").post(createGames);

export default router;
