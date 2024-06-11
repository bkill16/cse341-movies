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
exports.config = void 0;
const express_1 = __importDefault(require("express"));
const mongodb = require("./db/connect");
const routes_1 = __importDefault(require("./routes"));
const users_1 = require("./controllers/users");
const express_openid_connect_1 = require("express-openid-connect");
const dotenv = require("dotenv");
dotenv.config();
exports.config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_STRING,
    baseURL: "https://cse341-movies.onrender.com",
    clientID: "uRuRVh5ltGB0I0fsjZVb1GvEIboIfYD5",
    issuerBaseURL: "https://dev-mhlztk2ldiohgn5y.us.auth0.com",
};
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_openid_connect_1.auth)(exports.config));
app.use("/", routes_1.default);
let db;
mongodb.initDb((err, database) => {
    if (err) {
        console.log(err);
    }
    else {
        db = database;
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.oidc.isAuthenticated()) {
        const user = req.oidc.user;
        if (user) {
            const userInfo = {
                userId: user.sub,
                email: user.email,
                password: user.password,
            };
            try {
                yield (0, users_1.storeUserInMongoDB)(db, userInfo);
                res.send("Logged in");
            }
            catch (error) {
                console.error("Error storing user information:", error);
                res.status(500).send("Internal Server Error");
            }
        }
        else {
            res.status(401).send("Unauthorized");
        }
    }
    else {
        res.send("Logged out");
    }
}));
app.get("/profile", (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(req.oidc.user);
    }
    else {
        res.status(401).send("Unauthorized");
    }
});
app.get("/logout", (req, res) => {
    res.redirect(`https://dev-mhlztk2ldiohgn5y.us.auth0.com/v2/logout?returnTo=https://cse341-movies.onrender.com&client_id=${exports.config.clientID}`);
});
