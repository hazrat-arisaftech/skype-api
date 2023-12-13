import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
  res.send("Up and Running");
});

app.use(bodyParser.json());
app.use(cookieParser());

//routes
app.use("/api/v1", authRoute);

mongoose
  .connect(
    "mongodb+srv://HazratAli:HazratAli@atlascluster.wenyq4j.mongodb.net/?retryWrites=true&w=majority/Skype",
    {
      writeConcern: { w: "majority" },
    }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log(`Running on port 3000`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

export default app;
