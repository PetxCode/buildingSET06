import express, { Router } from "express";
import { testPay } from "../Testing/test";
import { auth } from "../auth";

const router: Router = express.Router();

// router.route("/").get(getGames);
router.route("/pay").post(testPay);

export default router;
