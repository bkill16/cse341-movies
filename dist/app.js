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
const express_1 = __importDefault(require("express"));
const mongodb = require("./db/connect");
const routes_1 = __importDefault(require("./routes"));
const dotenv = require("dotenv");
const users_1 = require("./controllers/users");
const connect_1 = require("./db/connect");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
dotenv.config();
const app = (0, express_1.default)();
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_STRING,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    afterCallback: (req, res, session, state) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Session object:", session); // Log the session object
        if (session && session.id_token) {
            const decodedToken = jsonwebtoken_1.default.decode(session.id_token); // Decode the ID token
            console.log("Decoded token:", decodedToken);
            if (decodedToken) {
                const userInfo = {
                    userId: decodedToken.sub,
                    email: decodedToken.email
                };
                yield (0, users_1.storeUserInMongoDB)((0, connect_1.getDb)(), userInfo);
            }
            else {
                console.error("Failed to decode ID token");
            }
        }
        else {
            console.error("ID token is missing in the session object");
        }
        return session;
    })
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        console.log('User is authenticated');
        res.send('Logged in');
    }
    else {
        console.log('User is not authenticated');
        res.send('Logged out');
    }
});
app.get('/logout', (req, res) => {
    req.oidc.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
        else {
            console.log('Session destroyed');
        }
        res.send('Logged out');
    });
});
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/", routes_1.default);
let db;
mongodb.initDb((err, database) => {
    if (err) {
        console.log(err);
    }
    else {
        db = database;
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
        });
    }
});
