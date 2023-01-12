import express from "express";
import "./src/configs/env.js";
import userRoute from "./src/users/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`Express API is listening on port ${process.env.API_PORT}`);
});
