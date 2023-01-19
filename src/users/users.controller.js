import JSONtoken from "jsonwebtoken";
import {
  createUser,
  deleteMitra,
  deletePenitip,
  editProfileMitra,
  editProfilePenitip,
  editVerified,
  getProfileMitra,
  getProfilePenitip,
  getUserbyID,
  getUserMitraUnverified,
  getUserMitraVerified,
} from "./users.model.js";

// register
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

  if (!(name && email && password && address && no_hp && role)) {
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

// get unverified mitra
export const getMitraUnverifiedRest = async (req, res) => {
  const respModel = await getUserMitraUnverified();
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get unverified mitra",
    },
    data: { respModel },
  });
};

// get verified mitra
export const getMitraVerifiedRest = async (req, res) => {
  const respModel = await getUserMitraVerified();
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get verified mitra",
    },
    data: { respModel },
  });
};

// get detail mitra
export const getMitrabyIDRest = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const respModel = await getUserbyID(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get detail mitra",
    },
    data: { respModel },
  });
};

// get profil mitra
export const getProfileMitraRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const id = bearer[1];
  const decode = JSONtoken.verify(id, process.env.JWT_SECRET);

  const respModel = await getProfileMitra(decode.id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get profile mitra",
    },
    data: { respModel },
  });
};

//edit verified mitra
export const editVerifiedRest = async (req, res) => {
  const { verified } = req.body;
  const id = req.params.id;

  if (!verified) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Please set mitra status",
      },
    });
  }

  const respModel = await editVerified(verified, id);
  console.log("ini respon", respModel);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success set status mitra",
    },
    data: {},
  });
};

// get profil penitip
export const getProfilePenitipRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const id = bearer[1];
  const decode = JSONtoken.verify(id, process.env.JWT_SECRET);

  const respModel = await getProfilePenitip(decode.id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get profile penitip",
    },
    data: { respModel },
  });
};

// delete akun mitra
export const deleteMitraRest = async (req, res) => {
  const id = req.params.id;

  deleteMitra(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success delete mitra",
    },
  });
};

// delete akun penitip
export const deletePenitipRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const id = bearer[1];
  const decode = JSONtoken.verify(id, process.env.JWT_SECRET);

  deletePenitip(decode.id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success delete account",
    },
  });
};

//edit profile mitra
export const editProfileMitraRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const decode = bearer[1];
  const id = JSONtoken.verify(decode, process.env.JWT_SECRET).id;

  const { name, email, password, no_hp, address, profile_photo } = req.body;

  const respModel = await editProfileMitra(
    id,
    name,
    email,
    password,
    no_hp,
    address,
    profile_photo
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success edit profile mitra",
    },
    data: {},
  });
};

//edit profile penitip
export const editProfilePenitipRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const decode = bearer[1];
  const id = JSONtoken.verify(decode, process.env.JWT_SECRET).id;

  const { name, email, password, no_hp, address, profile_photo } = req.body;

  const respModel = await editProfilePenitip(
    id,
    name,
    email,
    password,
    no_hp,
    address,
    profile_photo
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success edit profile penitip",
    },
    data: {},
  });
};
