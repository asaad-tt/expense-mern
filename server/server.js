import express from "express";
import connect from "./database/mongodb.js";
import TransactionsApi from "./routes/TransactionsApi.js";
// import bodyParser from "body-parser";
import cors from "cors";
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

// transaction api
app.use("/transaction", TransactionsApi);

// database connect
await connect();

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

// pass : PECB9FCKfb7KgLwO
// user : expenseMern
