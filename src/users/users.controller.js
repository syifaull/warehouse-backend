import {
  createUser,
  deleteMitra,
  getUserbyID,
  getUserMitraUnverified,
  getUserMitraVerified,
} from "./users.model.js";

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

// export const getProfileMitraRest = async (req, res) => {
//   const user = await getProfileMitra(id);

//   if (!user) {
//     return res.status(404).json({
//       meta: {
//         code: 404,
//         message: "ID not found",
//       },
//       data: {},
//     });
//   }

//   const respModel = await getProfileMitra();
//   return res.status(200).json({
//     meta: {
//       code: 200,
//       message: "Success get profile mitra",
//     },
//     data: { respModel },
//   });
// };

// export const editVerifiedRest = async (req, res) => {
//   const { verified } = req.body;
//   const id = req.params.id;

//   if (!verified) {
//     return res.status(400).json({
//       meta: {
//         code: 400,
//         message: "Please set mitra status",
//       },
//     });
//   }

//   const respModel = await editVerified(verified, id);
//   return res.status(200).json({
//     meta: {
//       code: 200,
//       message: "Success set status mitra",
//     },
//     data: { respModel },
//   });
// };

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
