import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  forYes,
  getUser,
  getUsers,
  refresh,
  signinUser,
  updateUser,
  verifiedUser,
  finalVerification,
} from "../controller/authController";

const router: Router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id").delete(deleteUser);

router.route("/create").post(createUser);
router.route("/sign-in").post(signinUser);
router.route("/refresh").post(refresh);

router.route("/:id/verify").post(verifiedUser);
router.route("/:id/finally").get(finalVerification);

export default router;
