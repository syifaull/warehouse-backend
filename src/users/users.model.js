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
      allowNull: false,
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

// register
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

// get unverified mitra
export const getUserMitraUnverified = async () => {
  const allUser = await Users.findAll({
    where: {
      role: "mitra",
      verified: "unverified",
    },
  });
  return allUser;
};

// get verified mitra
export const getUserMitraVerified = async () => {
  const allUser = await Users.findAll({
    where: {
      role: "mitra",
      verified: "verified",
    },
  });
  return allUser;
};

export default Users;
