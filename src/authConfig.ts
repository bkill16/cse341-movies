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
