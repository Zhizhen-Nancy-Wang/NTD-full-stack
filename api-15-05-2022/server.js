import "dotenv/config";

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// connect to mongodb
import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();

//convert incoming json object and make it available in req object
app.use(express.json());
app.use(cors());

// Task api endpoints
import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

import path from "path";
const __dirname = path.resolve();
app.use(express.static(path.resolve(__dirname, "./client-15-05-2022/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./client-15-05-2022/build", "index.html")
  );
});

// app.get("/", (req, res) => {
//   res.json({
//     message: "You have reached the not to do api server",
//   });
// });

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
