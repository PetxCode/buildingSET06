import { NextFunction, Request, Response } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

export const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const realToken = token.split(" ")[2];

      if (realToken) {
        jwt.verify(realToken, "accessTokenSecret", (err: any, payload: any) => {
          if (err) {
            throw err;
          } else {
            req.user = payload;
            next();
          }
        });
      } else {
        res.status(404).json({
          message: "Something doesn't seems right!",
        });
      }
    } else {
      res.status(404).json({
        message: "You don't have access for this Operation",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
