import express, { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  refresh,
  signinUser,
  updateUser,
  verifiedUser,
} from "../controller/authController";

const router: Router = express.Router();

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/verify").patch(verifiedUser);
router.route("/:id").delete(deleteUser);

router.route("/create").post(createUser);
router.route("/sign-in").post(signinUser);
router.route("/refresh").post(refresh);

export default router;
