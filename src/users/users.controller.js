import { createUser } from "./users.model.js";

export const createUserRest = async (req, res) => {
  const {
    name,
    email,
    password,
    no_hp,
    address,
    role,
    verified,
    file_ktp,
    profile_photo,
  } = req.body;

  if (!(name && email && password)) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const respModel = await createUser(
    name,
    email,
    password,
    no_hp,
    address,
    role,
    verified,
    file_ktp,
    profile_photo
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success add user",
    },
    data: {
      id: respModel,
    },
  });
};
