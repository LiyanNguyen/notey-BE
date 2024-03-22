import express from "express";
import bodyParser from "body-parser";
import cookiParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import noteRoute from "./routes/noteRoute";
require("dotenv").config();

export const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookiParser());
app.use(bodyParser.json());


app.listen(process.env.PORT!, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL!).then(() => console.log('Connected to Database'));
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use(noteRoute);
