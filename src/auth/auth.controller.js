import jwtController from "jsonwebtoken";
import { getUserbyName } from "../users/users.model.js";

export const authLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name && !password) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const user = await getUserbyName(name);

  if (!user) {
    return res.status(404).json({
      meta: {
        code: 404,
        message: "Username not found",
      },
      data: {},
    });
  }

  if (user.role === "mitra" && user.verified === "unverified") {
    return res.status(401).json({
      meta: {
        code: 401,
        message: "Mitra belum diverifikasi",
      },
      data: {},
    });
  }

  if (user.password === password) {
    const token = jwtController.sign(
      {
        role: user.role,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );
    return res.status(200).json({
      meta: {
        code: 200,
        message: "Success login",
      },
      data: {
        token: token,
        name: user.name,
        role: user.role,
      },
    });
  }
  return res.status(400).json({
    meta: {
      code: 400,
      message: "Wrong password",
    },
    data: {},
  });
};
