import express, { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifiedMail } from "../utils/email";
import { verifyEmail } from "../utils/HEEmail";
import adminModel from "../model/adminModel";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const users = await adminModel.find();
    res.status(200).json({
      message: "found all Users",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminModel.findById(id);
    res.status(200).json({
      message: "Single user found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await adminModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    res.status(200).json({
      message: "Single user updated",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const verifiedAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await adminModel.findByIdAndUpdate(
      id,
      { token: "", verified: true },
      { new: true },
    );
    res.status(200).json({
      message: "Single user verified",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await adminModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Single user deleted",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { companyName, email, password } = req.body;
    const token = crypto.randomBytes(48).toString("hex");

    // const admin = awa

    const salt = await bcrypt.genSalt(10);
    const hasked = await bcrypt.hash(password, salt);

    const admin = await adminModel.create({
      companyName,
      email,
      password: hasked,
      token,
    });

    verifyEmail(admin);
    // verifyEmailAdmin(admin);

    res.status(200).json({
      message: "Single user found",
      data: admin,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error gettign users",
    });
  }
};

export const signinAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const user = await adminModel.findOne({ email });
    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        if (user.verified && user.token === "") {
          const accessToken = jwt.sign(
            {
              id: user._id,
            },
            "accessTokenSecret",
            { expiresIn: "20s" },
          );
          const refreshToken = jwt.sign(
            {
              id: user._id,
            },
            "refreshTokenSecret",
            { expiresIn: "1m" },
          );

          res.status(200).json({
            message: "Single user found",
            data: { accessToken, refreshToken },
          });
        } else {
          res.status(404).json({
            message: "something is wrong with your verification",
          });
        }
      } else {
        res.status(404).json({
          message: "user's password is not correct",
        });
      }
    } else {
      res.status(404).json({
        message: "No user with this Email found",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    jwt.verify(refreshToken, "refreshTokenSecret", (err: any, payload: any) => {
      if (err) {
        throw err;
      } else {
        console.log(payload);

        const accessToken = jwt.sign(
          {
            id: payload.id,
          },
          "accessTokenSecret",
          { expiresIn: "20s" },
        );

        const refreshToken = req.body.refreshToken;

        return res.status(200).json({
          message: "New Token",
          data: { accessToken, refreshToken },
        });
      }
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting Games",
    });
  }
};
