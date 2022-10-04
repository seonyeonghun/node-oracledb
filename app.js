const express = require("express");
const dbconfig = require("./dbconfig");
const oracledb = require("oracledb");
const logger = require("morgan");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  console.log("listening...");
  res.send("node.js plus oracledb project");
});

async function run() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbconfig);
    console.log("connection was successful!");
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`server is running on ${process.env.EXPRESS_PORT}`);
});
app.use(logger("dev"));
