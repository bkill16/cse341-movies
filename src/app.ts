import express from "express";
import mongodb = require("./db/connect");
import { Db } from "mongodb";
import router from "./routes";
import dotenv = require("dotenv");
import { storeUserInMongoDB, UserInfo } from "./controllers/users";
import { getDb } from "./db/connect";
import jwt from "jsonwebtoken";
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_STRING,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  afterCallback: async (req: any, res: any, session: any, state: any) => {
    console.log("Session object:", session); // Log the session object

    if (session && session.id_token) {
      const decodedToken: any = jwt.decode(session.id_token); // Decode the ID token
      console.log("Decoded token:", decodedToken);

      if (decodedToken) {
        const userInfo: UserInfo = {
          userId: decodedToken.sub,
          email: decodedToken.email
        };

        await storeUserInMongoDB(getDb(), userInfo);
      } else {
        console.error("Failed to decode ID token");
      }
    } else {
      console.error("ID token is missing in the session object");
    }

    return session;
  }
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req: any, res) => {
  if (req.oidc.isAuthenticated()) {
    console.log('User is authenticated');
    res.send('Logged in');
  } else {
    console.log('User is not authenticated');
    res.send('Logged out');
  }
});

app.get('/logout', (req: any, res) => {
  req.oidc.logout();
  req.session.destroy((err: any) => {
    if (err) {
      console.log('Error destroying session:', err);
    } else {
      console.log('Session destroyed');
    }
    res.send('Logged out');
  });
});

app.get('/profile', requiresAuth(), (req: any, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", router);

let db: Db;

mongodb.initDb((err: Error | null, database: Db | null) => {
  if (err) {
    console.log(err);
  } else {
    db = database!;
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
