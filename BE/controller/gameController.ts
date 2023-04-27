import express, { Request, Response } from "express";
import gameModel from "../model/gameModel";

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await gameModel.find();
    res.status(200).json({
      message: "games found",
      data: games,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting Games",
    });
  }
};

export const createGames = async (req: Request, res: Response) => {
  try {
    const { name, detail } = req.body;
    const game = await gameModel.create({ name, detail });
    res.status(201).json({
      message: "games created",
      data: game,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error getting Games",
    });
  }
};
