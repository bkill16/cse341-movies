import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { getDb } from "../db/connect";
import { body, param, validationResult } from "express-validator";

// Validation middleware for user data
const validateUserData = [
  body("username").isString().notEmpty().withMessage("Username is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  body("email").isEmail().withMessage("Valid email is required"),
];

const validateObjectId = [
  param("id").custom((value) => ObjectId.isValid(value)).withMessage("Invalid ID format"),
];

// Middleware to handle validation errors
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Controller functions
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getDb().collection("users").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching users",
      details: (error as Error).message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await getDb().collection("users").findOne({ _id: userId });
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while fetching the user",
      details: (error as Error).message,
    });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    };
    const response = await getDb().collection("users").insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ error: "An error occurred while creating the user" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while creating the user",
      details: (error as Error).message,
    });
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
    const response = await getDb().collection("users").replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "An error occurred while updating the user" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while updating the user",
      details: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await getDb().collection("users").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "An error occurred while deleting the user" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while deleting the user",
      details: (error as Error).message,
    });
  }
};

export {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  validateUserData,
  validateObjectId,
  validateRequest,
};
