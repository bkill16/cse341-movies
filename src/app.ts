import express, { Request, Response } from "express";
import mongodb = require("./db/connect");
import { Db } from "mongodb";
import router from "./routes";
import { storeUserInMongoDB, UserInfo } from "./controllers/users";
import { auth, RequestContext } from "express-openid-connect";

import dotenv = require("dotenv");
dotenv.config();

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_STRING,
  baseURL: "https://cse341-movies.onrender.com",
  clientID: "uRuRVh5ltGB0I0fsjZVb1GvEIboIfYD5",
  issuerBaseURL: "https://dev-mhlztk2ldiohgn5y.us.auth0.com",
};

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

app.get("/", async (req: Request, res: Response) => {
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

app.get("/login", (req: Request, res: Response) => {
  const returnTo = encodeURIComponent("https://cse341-movies.onrender.com");
  const auth0Domain = "https://dev-mhlztk2ldiohgn5y.us.auth0.com";
  const clientId = "uRuRVh5ltGB0I0fsjZVb1GvEIboIfYD5";
  res.redirect(`${auth0Domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${returnTo}`);
});

app.get("/profile", (req: Request, res: Response) => {
  if (req.oidc.isAuthenticated()) {
    res.send(req.oidc.user);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/logout", (req: Request, res: Response) => {
  res.redirect(`https://dev-mhlztk2ldiohgn5y.us.auth0.com/v2/logout?returnTo=https://cse341-movies.onrender.com&client_id=${config.clientID}`);
});