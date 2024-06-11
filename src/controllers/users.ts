import { Db } from "mongodb";
import { getDb } from "../db/connect";
import { Request, Response } from "express";

const collectionName = "users";

export interface UserInfo {
  userId: string;
  email: string;
}

export async function storeUserInMongoDB(db: Db, userInfo: UserInfo): Promise<void> {
  try {
    const collection = await getDb().collection(collectionName);
    const existingUser = await collection.findOne({ email: userInfo.email });

    if (existingUser) {
      throw new Error("User already exists");
    } else {
      await collection.insertOne(userInfo);
      console.log("User info stored successfully");
    }
  } catch (error) {
    console.error("Error storing user information:", error);
    throw error;
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const collection = getDb().collection(collectionName);
    const result = await collection.find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res.status(500).json({ error: "An error occurred while retrieving all users" });
  }
};