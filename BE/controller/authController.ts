import express, { Request, Response } from "express";
import userModel from "../model/authModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifiedMail } from "../utils/email";

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
    const { OTP } = req.body;

    const staff = await userModel.findById(id);

    console.log(staff);

    if (staff) {
      if (OTP === staff.OTP) {
        const staffData = await userModel.findByIdAndUpdate(
          id,
          { token: "", verified: true },
          { new: true },
        );
        res.status(200).json({
          message: "Single user verified",
          data: staffData,
        });
      }
    } else {
      res.status(404).json({
        message: "Staff not found",
      });
    }
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
    const { companyName, name, email, password } = req.body;
    const token = crypto.randomBytes(48).toString("hex");

    const admin = await adminModel.findOne({ companyName });

    // get OTP
    const OTP = crypto.randomBytes(3).toString("hex");
    // const admin = awa

    const salt = await bcrypt.genSalt(10);
    const hasked = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      companyName,
      name,
      email,
      password: hasked,
      token,
      OTP,
    });

    const adminData: any = admin?.staff.push(
      new mongoose.Types.ObjectId(user?._id),
    );

    verifyStaffEmail(user);
    verifyStaffEmailByAdmin(user, admin);

    res.status(200).json({
      message: "Single user found",
      data: { user, adminData },
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const finalVerification = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const { id } = req.params;

    const staff = await userModel.findOne({ _id: id });

    const admin = await adminModel.findOne({ companyName: staff?.companyName });

    finalVerifyAdminEmail(staff, admin);
    finalVerifyStaffEmail(staff);

    return res.status(200).json({
      message: "Admin and User data",
      data: { staff, admin },
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting Games",
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

import lodash from "lodash";
import adminModel from "../model/adminModel";
import mongoose from "mongoose";
import {
  finalVerifyAdminEmail,
  finalVerifyStaffEmail,
  verifyStaffEmail,
  verifyStaffEmailByAdmin,
} from "../utils/HEEmail";

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

const dataData: any = [];
const dataData1: any = [];
const dataData2: any = [];
const dataData3: any = [];
const dataData4: any = [];

Array.from({ length: 10 }, () => {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  dataData.push({
    items: letters[Math.floor(Math.random() * letters.length)],
    cost: random(20, 100),
  });
});

Array.from({ length: 10 }, () => {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  dataData2.push({
    items: letters[Math.floor(Math.random() * letters.length)],
    value: random(82, 109),
  });
});

Array.from({ length: 10 }, () => {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  dataData3.push({
    items: letters[Math.floor(Math.random() * letters.length)],
    value: random(82, 109),
  });
});

Array.from({ length: 10 }, () => {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  dataData4.push({
    items: letters[Math.floor(Math.random() * letters.length)],
    value: random(82, 109),
  });
});

Array.from({ length: 10 }, () => {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  dataData1.push({
    items: letters[Math.floor(Math.random() * letters.length)],
    value: random(82, 109),
  });
});

export const forYes = async (req: Request, res: Response) => {
  try {
    console.log(dataData);

    const newData = lodash.sortBy(dataData, "cost");
    const newData1 = lodash.groupBy(dataData, "items");

    res.json({
      data: { newData, newData1 },
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting Games",
    });
  }
};
