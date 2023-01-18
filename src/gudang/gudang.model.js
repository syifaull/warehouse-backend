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

// Users.hasOne(Gudang);
// Gudang.belongsTo(Users);
// Gudang.associate = (models) => {
//   Gudang.belongsTo(models.user);
// };

export const createGudang = async (nam, loc, us_id, lat, long) => {
  // Gudang.belongsTo(Users);

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

export default Gudang;
