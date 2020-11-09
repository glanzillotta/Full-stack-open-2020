import cors from "cors";
import express, { json } from "express";
const app = express();
import mongoose from "mongoose";
const { connect } = mongoose;
import { MONGODB_URI } from "./utils/config.js";
import blogsRouter from "./controllers/blogs.js";
import {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} from "./utils/middleware.js";

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(json());
app.use(requestLogger);

app.use("/api/blogs", blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
