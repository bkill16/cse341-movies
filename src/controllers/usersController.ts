import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";

const getAllUsers = async (req: Request, res: Response) => {
  const result = await getDb().collection("users").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingleUser = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const result = await getDb().collection("users").find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req: Request, res: Response) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const response = await getDb().collection("users").insertOne(user);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json("Some error occured while creating the user");
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const response = await getDb()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while updating the user");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = new ObjectId(req.params.id);
  const response = await getDb().collection("users").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json("Some error occured while deleting the user");
  }
};

export { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
