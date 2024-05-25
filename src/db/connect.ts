const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

let _db: any;

const initDb = (callback: (arg0: null, arg1: any) => any) => {
  if (_db) {
    console.log("Db is already initialized!");
    return callback(null, _db);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client: any) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err: null) => {
      callback(err, null);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
