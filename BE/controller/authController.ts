import express, { Request, Response } from "express";
import userModel from "../model/authModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();
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

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(id, { name }, { new: true });
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

export const verifiedUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await userModel.findByIdAndUpdate(
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

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const token = crypto.randomBytes(48).toString("hex");

    const salt = await bcrypt.genSalt(10);
    const hasked = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name,
      email,
      password: hasked,
      token,
    });
    res.status(200).json({
      message: "Single user found",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error gettign users",
    });
  }
};

export const signinUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const user = await userModel.findOne({ email });
    if (user) {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        if (user.verified && user.token === "") {
          const accessToken = jwt.sign(
            {
              id: user._id,
            },
            "accessTokenSecret",
            { expiresIn: "25s" },
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
