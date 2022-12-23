import express from "express";
import mongoose from "mongoose";
import Transaction from "./models/transaction.js";
// import bodyParser from "body-parser";
import cors from "cors";
const PORT = 4000;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());

// mongodb connect
await mongoose.connect(
  "mongodb+srv://expenseMern:PECB9FCKfb7KgLwO@asad-mern.mktk1b5.mongodb.net/?retryWrites=true&w=majority"
);
console.log("mongoDb connection is successful ");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/transaction", async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createdAt: -1 });
  res.json({ data: transaction });
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

// pass : PECB9FCKfb7KgLwO
// user : expenseMern
