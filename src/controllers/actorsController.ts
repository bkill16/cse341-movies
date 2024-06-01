import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllActors = async (req: Request, res: Response) => {
  const result = await getDb().collection("actors").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleActor = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb().collection("actors").find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createActor = async (req: Request, res: Response) => {
  const actor = {
    name: req.body.name,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    nationality: req.body.nationality
  };
  const response = await getDb().collection("actors").insertOne(actor);
  
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json("Some error occured while creating the actor");
  }
};

const updateActor = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const actor = {
    name: req.body.name,
    birthDate: req.body.birthDate,
    deathDate: req.body.deathDate,
    nationality: req.body.nationality
  };
  const response = await getDb()
  .collection("actors")
  .replaceOne({ _id: userId }, actor);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while updating the actor");
  }
};

const deleteActor = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb().collection("actors").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while deleting the actor");
  }
};

export {
  getAllActors,
  getSingleActor,
  createActor,
  updateActor,
  deleteActor
};