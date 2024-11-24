import { Request, Response, NextFunction } from "express";
import { Garage, IGarage } from "../models/garageModel";
import { GarageFetchType } from "../models/garageFetchType";
import { getAllGarages, getLimitGarages } from "../services/axios";

export const getGarage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const garageLimit = parseInt(req.query.limit as string, 10);
    const fetchType: GarageFetchType = req.query.type as GarageFetchType;

    if (
      fetchType === GarageFetchType.LIMIT &&
      garageLimit !== null &&
      (isNaN(garageLimit) || garageLimit <= 0)
    ) {
      res.status(400).json({ message: "Invalid limit value" });
      return;
    }

    if (!Object.values(GarageFetchType).includes(fetchType)) {
      res
        .status(400)
        .json({ message: 'Invalid fetch type. Use "all" or "limit"' });
      return;
    }

    let garages: IGarage[] = [];
    if (fetchType === GarageFetchType.ALL) {
      const axiosGarages = await getAllGarages();
      const mongoGarages = await Garage.find({});
      garages = [...axiosGarages, ...mongoGarages];
    } else if (fetchType === GarageFetchType.LIMIT) {
      garages = await getLimitGarages(garageLimit);
    }

    res.status(200).json(garages);
  } catch (error) {
    next(error);
  }
};

export const addGarage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { garageData } = req.body;
    const newGarage = new Garage(garageData);
    const savedGarage = await newGarage.save();
    res.status(201).json(savedGarage);
  } catch (error) {
    next(error);
  }
};
