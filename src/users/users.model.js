import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Users = newSeq.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.STRING,
      defaultValue: "unverified",
    },
    file_ktp: {
      type: DataTypes.STRING,
    },
    profile_photo: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

newSeq
  .sync()
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });

// Users.associate = (models) => {
//   Users.hasOne(models.gudang);
// };

export const createUser = async (un, em, pw, hp, add, rol, ver, ktp, pp) => {
  const create = await Users.create({
    name: un,
    email: em,
    password: pw,
    no_hp: hp,
    address: add,
    role: rol,
    verified: ver,
    file_ktp: ktp,
    profile_photo: pp,
  });
  console.log(un, "'s id: ", create.id);
  return create.id;
};

// auth login
export const getUserbyName = async (un) => {
  const allUser = await Users.findOne({
    where: {
      name: un,
    },
  });
  return allUser;
};

export const getUserMitraUnverified = async () => {
  const allUser = await Users.findAll({
    where: {
      role: "mitra",
      verified: "unverified",
    },
  });
  return allUser;
};

export const getUserMitraVerified = async () => {
  const allUser = await Users.findAll({
    where: {
      role: "mitra",
      verified: "verified",
    },
  });
  return allUser;
};

export const getUserbyID = async (id) => {
  const allUser = await Users.findOne({
    where: {
      id: id,
    },
  });
  return allUser;
};

export const getProfileMitra = async (id) => {
  const allUser = await Users.findOne({
    where: {
      id: id,
    },
  });
  return allUser;
};

export const editVerified = async (ver, id) => {
  const edit = await Users.update(
    {
      verified: ver,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return edit;
};

export const getProfilePenitip = async (id) => {
  const allUser = await Users.findOne({
    where: {
      id: id,
    },
  });
  return allUser;
};

export const deleteMitra = async (id) => {
  await Users.destroy({
    where: {
      id: id,
    },
  });
};

export const deletePenitip = async (id) => {
  await Users.destroy({
    where: {
      id: id,
    },
  });
};

export const editProfileMitra = async (id, un, em, pw, hp, add, pp) => {
  const edit = await Users.update(
    {
      name: un,
      email: em,
      password: pw,
      no_hp: hp,
      address: add,
      profile_photo: pp,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return edit;
};

export const editProfilePenitip = async (id, un, em, pw, hp, add, pp) => {
  const edit = await Users.update(
    {
      name: un,
      email: em,
      password: pw,
      no_hp: hp,
      address: add,
      profile_photo: pp,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return edit;
};

export default Users;
