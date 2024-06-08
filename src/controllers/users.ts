import { ObjectId } from "mongodb";
import { Request, Response } from "express";
import { getDb } from "../db/connect";
import bcrypt from "bcrypt";

const saltRounds = 10;

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving all users" });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("users").find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    }
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res
      .status(500)
      .json({ error: "An error occured while retrieving the user" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const response = await getDb().collection("users").insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({
        error: "An error occured while creating the user",
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occured while creating the user" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };

    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const response = await getDb()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "An error occured while updating the user" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb()
      .collection("users")
      .deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "An error occured while deleting the user" });
  }
};

export { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
