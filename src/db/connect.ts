import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let _db: Db | null = null;

const initDb = (callback: (err: Error | null, db : Db | null) => void): void => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  const uri = process.env.MONGODB_URI || "";
  MongoClient.connect(uri)
    .then((client: MongoClient) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err: Error) => {
      callback(err, null);
    });
};

const getDb = (): Db => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

export { initDb, getDb };
