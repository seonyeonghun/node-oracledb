const dotenv = require("dotenv");
dotenv.config();

// const db = {
//   port,
//   user,
//   password,
//   connectString,
//   externalAuth
// } =

module.exports = {
  user: "DEMO",
  password: "0000",
  connectString: "localhost:1521/xepdb1",
  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false,
};
