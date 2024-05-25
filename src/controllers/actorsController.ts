import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllActors = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("actors").find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

const getSingleActor = async (req: Request, res: Response) => {
  try {
    const result = await getDb()
      .collection("actors")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

const createActor = async (req: Request, res: Response) => {
  try {
    const actor = {
      name: req.body.name,
      birthDate: req.body.birthDate,
      deathDate: req.body.deathDate,
      nationality: req.body.nationality,
      movies: req.body.movies
    };
    const result = await getDb().collection("actors").insertOne(actor);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to create actor" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

export { getAllActors, getSingleActor, createActor };
