"use strict";
/// <reference path="./types/express.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongodb = require("./db/connect");
const routes_1 = __importDefault(require("./routes"));
const authConfig_1 = require("./authConfig");
const { auth } = require("express-openid-connect");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(auth(authConfig_1.config));
app.use("/", routes_1.default);
mongodb.initDb((err, _db) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
app.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
