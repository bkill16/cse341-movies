import express = require("express");
import mongodb = require("./db/connect");
import { Db } from "mongodb";
import router from "./routes";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/", router);

mongodb.initDb((err: Error | null, _db: Db | null) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
