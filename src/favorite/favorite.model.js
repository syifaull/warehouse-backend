import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Favorites = newSeq.define(
  "favorites",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    lahan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "lahans",
        key: "id",
      },
    },
  },
  {
    paranoid: true,
  }
);

newSeq
  .sync()
  .then(() => {
    console.log("Favorite table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });

export const createFavorite = async (user_id, lahan_id) => {
  const create = await Favorites.create({
    user_id: user_id,
    lahan_id: lahan_id,
  });
  console.log("new favorite's id", create.id);
  return create.id;
};

export const getFavorite = async (id) => {
  const allUser = await Favorites.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: lahans,
        as: "lahan",
        attributes: "name",
      },
    ],
  });
  return allUser;
};

export default Favorites;
