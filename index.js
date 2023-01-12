import express from "express";
import "./src/configs/env.js";

const app = express();

app.use(express.json());

app.listen(process.env.API_PORT, () => {
  console.log(`Express API is listening on port ${process.env.API_PORT}`);
});
