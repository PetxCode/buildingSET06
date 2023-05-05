import express, { Router } from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  refresh,
  signinAdmin,
  updateAdmin,
  verifiedAdmin,
} from "../controller/adminControllerData";

const router: Router = express.Router();

router.route("/").get(getAdmins);
router.route("/:id").get(getAdmin);
router.route("/:id/update").patch(updateAdmin);
router.route("/:id/verify").get(verifiedAdmin);
router.route("/:id").delete(deleteAdmin);
router.route("/create").post(createAdmin);
router.route("/sign-in").post(signinAdmin);
router.route("/refresh").post(refresh);

export default router;
