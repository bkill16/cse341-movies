"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongodb = require("./db/connect");
const routes_1 = __importDefault(require("./routes"));
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use('/', routes_1.default);
mongodb.initDb((err, _db) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
