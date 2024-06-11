import express, { Request, Response } from "express";
import mongodb = require("./db/connect");
import { Db } from "mongodb";
import router from "./routes";
import { storeUserInMongoDB, UserInfo } from "./controllers/users";
import { auth, requiresAuth } from 'express-openid-connect';
import session from 'express-session';

import dotenv = require("dotenv");
dotenv.config();

const app = express();

export const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_STRING as string,
  baseURL: "https://cse341-movies.onrender.com",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: "https://dev-mhlztk2ldiohgn5y.us.auth0.com",
};

app.use(session({
  secret: process.env.SESSION_STRING as string,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

const port = process.env.PORT || 3000;

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

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Failed to log out');
      }
      res.oidc.logout({ returnTo: 'http://cse341-movies.onrender.com' });
  });
});