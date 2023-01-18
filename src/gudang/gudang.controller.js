import JSONtoken from "jsonwebtoken";
import { createGudang, getAllGudang } from "./gudang.model.js";

// add new gudang
export const createGudangRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const token = bearer[1];
  const us_id = JSONtoken.verify(token, process.env.JWT_SECRET).id;
  const { name, location, latitude, longitude } = req.body;

  if (!(name && location)) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
    });
  }

  const respModel = await createGudang(
    name,
    location,
    us_id,
    latitude,
    longitude
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success add new gudang",
    },
    data: {
      id: respModel,
    },
  });
};

// get all gudang pada homepage
export const getAllGudangRest = async (req, res) => {
  const respModel = await getAllGudang();
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get all gudang",
    },
    data: { respModel },
  });
};
