import JSONtoken from "jsonwebtoken";
import {
  createFavorite,
  deleteFavorite,
  getFavorite,
} from "./favorite.model.js";

// create new favorite
export const createFavoriteRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const token = bearer[1];
  const user_id = JSONtoken.verify(token, process.env.JWT_SECRET).id;

  const { lahan_id } = req.body;

  if (!(user_id && lahan_id)) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const respModel = await createFavorite(user_id, lahan_id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success add to favorite",
    },
    data: {
      id: respModel,
    },
  });
};

//get favorite
export const getFavoriteRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const token = bearer[1];
  const id = JSONtoken.verify(token, process.env.JWT_SECRET).id;

  const respModel = await getFavorite(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get favorite lahan",
    },
    data: { respModel },
  });
};

// delete Favorite
export const deleteFavoriteRest = async (req, res) => {
  const id = req.params.id;

  deleteFavorite(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success delete favorite",
    },
  });
};
