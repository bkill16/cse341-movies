"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initDb = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let _db = null;
const initDb = (callback) => {
    if (_db) {
        console.log("Db is already initialized!");
        return callback(null, _db);
    }
    const uri = process.env.MONGODB_URI || "";
    mongodb_1.MongoClient.connect(uri)
        .then((client) => {
        _db = client.db();
        callback(null, _db);
    })
        .catch((err) => {
        callback(err, null);
    });
};
exports.initDb = initDb;
const getDb = () => {
    if (!_db) {
        throw Error("Db not initialized");
    }
    return _db;
};
exports.getDb = getDb;
