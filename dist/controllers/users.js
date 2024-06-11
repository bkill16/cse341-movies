"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.storeUserInMongoDB = void 0;
const connect_1 = require("../db/connect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const collectionName = "users";
function storeUserInMongoDB(db, userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, connect_1.getDb)().collection(collectionName);
            const existingUser = yield collection.findOne({ email: userInfo.email });
            if (existingUser) {
                throw new Error("User already exists");
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(userInfo.password, 10);
                userInfo.password = hashedPassword;
                yield collection.insertOne(userInfo);
                console.log("User info stored successfully");
            }
        }
        catch (error) {
            console.error("Error storing user information:", error);
            throw error;
        }
    });
}
exports.storeUserInMongoDB = storeUserInMongoDB;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, connect_1.getDb)().collection("users").find();
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    }
    catch (error) {
        console.error("Error retrieving all users:", error);
        res
            .status(500)
            .json({ error: "An error occured while retrieving all users" });
    }
});
exports.getAllUsers = getAllUsers;
