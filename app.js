const express = require("express");
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig");
const logger = require("morgan");
const nunjucks = require("nunjucks");
const e = require("express");

const app = express();
app.use(logger("dev"));

let result;

oracledb.autoCommit = true; //자동 커밋

oracledb.getConnection(
  {
    user: dbConfig.user,
    password: dbConfig.password,
    connectString: dbConfig.connectString,
  },
  function (err, conn) {
    if (err) {
      throw err;
    }
    var sql;

    // select
    sql = "select * from member";

    conn.execute(sql, [], function (err, result) {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      doRelease(conn);
    });
  }
);

//DB 종료
function doRelease(conn) {
  conn.release(function (err) {
    if (err) {
      throw err;
    }
  });
}

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

app.listen(dbConfig.EXPRESS_PORT, () => {
  console.log(`server is running on ${dbConfig.EXPRESS_PORT}`);
});
