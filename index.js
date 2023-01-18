import express from "express";
import authRoute from "./src/auth/auth.routes.js";
import gudangRoute from "./src/gudang/gudang.routes.js";
import userRoute from "./src/users/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", gudangRoute);

app.listen(process.env.API_PORT, () => {
  console.log(`Express API is listening on port ${process.env.API_PORT}`);
});
