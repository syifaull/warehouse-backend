import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";
import Lahan from "../lahan/lahan.model.js";

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
  Favorites.hasMany(Lahan);
  // Lahan.belongsTo(Favorites, {
  //   foreignKey: "lahan_id",
  //   as: "lahan"
  // })
  const allUser = await Favorites.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: Lahan,
        as: "lahans",
        required: false,
        // attributes: ["name", "harga", "foto_lahan"],
      },
    ],
  });
  return allUser;
};

export const deleteFavorite = async (id) => {
  await Favorites.destroy({
    where: {
      id: id,
    },
  });
};

export default Favorites;
