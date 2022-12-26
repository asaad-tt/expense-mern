import express from "express";
import connect from "./database/mongodb.js";
import TransactionsApi from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js";
import UserApi from "./routes/UserApi.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
// import bodyParser from "body-parser";
import cors from "cors";
const PORT = 4000;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passportConfig(passport);
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

// transaction api
app.use("/transaction", TransactionsApi);
app.use("/auth", AuthApi);
app.use("/user", UserApi);

// database connect
await connect();

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

// pass : PECB9FCKfb7KgLwO
// user : expenseMern
