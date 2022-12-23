import mongoose from "mongoose";

// mongodb connect

async function connect() {
  await mongoose.connect(
    "mongodb+srv://expenseMern:PECB9FCKfb7KgLwO@asad-mern.mktk1b5.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("mongoDb connection is successful ");
}

export default connect;
