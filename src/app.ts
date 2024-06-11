/// <reference path="./types/express.d.ts" />

import express = require("express");
import mongodb = require("./db/connect");
import { Db } from "mongodb";
import router from "./routes";
import { config } from "./authConfig";
import { storeUserInMongoDB, UserInfo } from "./controllers/users";

const { auth } = require("express-openid-connect");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(auth(config));

app.use("/", router);

let db: Db;

mongodb.initDb((err: Error | null, database: Db | null) => {
  if (err) {
    console.log(err);
  } else {
    db = database!;
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});

app.get("/", async (req: express.Request, res: express.Response) => {
  if (req.oidc.isAuthenticated()) {
    const user = req.oidc.user;
    if (user) {
      const userInfo: UserInfo = {
        userId: user.sub,
        email: user.email,
        password: user.password,
      };

      try {
        await storeUserInMongoDB(db, userInfo);
        res.send("Logged in");
      } catch (error) {
        console.error("Error storing user information:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.send("Logged out");
  }
});