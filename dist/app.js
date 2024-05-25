"use strict";
const express = require("express");
const mongodb = require("./db/connect");
const port = process.env.PORT || 3000;
const app = express();
mongodb.initDb((err, db) => {
    if (err) {
        console.log(err);
    }
    else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
