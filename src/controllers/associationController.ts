import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllAssociations = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("movieActors").find();
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

const getSingleAssociation = async (req: Request, res: Response) => {
  try {
    const result = await getDb()
      .collection("movieActors")
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

const createAssociation = async (req: Request, res: Response) => {
  try {
    const { movieId, actorId } = req.body;
    const association = {
      movieId: new ObjectId(movieId),
      actorId: new ObjectId(actorId),
    };
    const result = await getDb()
      .collection("movieActors")
      .insertOne(association);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json({ message: "Failed to create assocation" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "A unknown error occurred" });
    }
  }
};

export { getAllAssociations, getSingleAssociation, createAssociation };
