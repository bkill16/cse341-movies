import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllAssociations = async (req: Request, res: Response) => {
  const result = await getDb().collection("movieActors").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleAssociation = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb().collection("movieActors").find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createAssociation = async (req: Request, res: Response) => {
  const { movieId, actorId } = req.body;
  const association = {
    movieId: new ObjectId(movieId),
    actorId: new ObjectId(actorId),
  };
  const response = await getDb().collection("movieActors").insertOne(association);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json("Some error occured while creating the association");
  }
};

const updateAssociation = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const { movieId, actorId } = req.body;
  const association = {
    movieId: new ObjectId(movieId),
    actorId: new ObjectId(actorId),
  };
  const response = await getDb()
    .collection("movieActors")
    .replaceOne({ _id: userId }, association);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while updating the association");
  }
};

const deleteAssociation = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb()
    .collection("movieActors")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while deleting the association");
  }
};

export {
  getAllAssociations,
  getSingleAssociation,
  createAssociation,
  updateAssociation,
  deleteAssociation,
};
