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
    const existingUser = await collection.findOne({ userId: userInfo.userId });

    if (existingUser) {
      console.log("User already exists");
    } else {
      await collection.insertOne(userInfo);
      console.log("User info stored successfully");
    }
  } catch (error) {
    console.log("Error in storing user info in MongoDB:", error);
  }
}


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

export { getAllUsers };