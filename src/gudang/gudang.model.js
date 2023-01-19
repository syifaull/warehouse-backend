import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Gudang = newSeq.define(
  "gudang",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
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
    console.log("Gudang table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });

export const createGudang = async (nam, loc, us_id, lat, long) => {
  const create = await Gudang.create({
    name: nam,
    location: loc,
    user_id: us_id,
    latitude: lat,
    longitude: long,
  });
  console.log(nam, "'s id: ", create.id, "dengan user:", create.user_id);
  return create.id;
};

export const getAllGudang = async () => {
  const allUser = await Gudang.findAll();
  return allUser;
};

// get id gudang
export const getGudangID = async (us_id) => {
  const allUser = await Gudang.findOne({
    where: {
      user_id: us_id,
    },
  });
  return allUser;
};

// update gudang
export const updateGudang = async (us_id, nam, loc, lat, long) => {
  const allUser = await Gudang.update(
    {
      name: nam,
      location: loc,
      latitude: lat,
      longitude: long,
    },
    {
      where: {
        user_id: us_id,
      },
    }
  );
  return allUser;
};

export default Gudang;
