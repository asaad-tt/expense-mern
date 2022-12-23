import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const PORT = 4000;

const app = express();
app.use(cors);

// mongodb connect
await mongoose.connect(
  "mongodb+srv://expenseMern:PECB9FCKfb7KgLwO@asad-mern.mktk1b5.mongodb.net/?retryWrites=true&w=majority"
);
console.log("mongoDb connection is successful ");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

// pass : PECB9FCKfb7KgLwO
// user : expenseMern
