"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_STRING,
    baseURL: 'http://localhost:3000',
    clientID: 'uRuRVh5ltGB0I0fsjZVb1GvEIboIfYD5',
    issuerBaseURL: 'https://dev-mhlztk2ldiohgn5y.us.auth0.com'
};
