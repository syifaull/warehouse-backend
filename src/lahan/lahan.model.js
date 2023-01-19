import { DataTypes } from "sequelize";
import { newSeq } from "../configs/database.js";

const Lahan = newSeq.define(
  "lahan",
  {
    gudang_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "gudangs",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    luas: {
      type: DataTypes.INTEGER,
    },
    lebar: {
      type: DataTypes.INTEGER,
    },
    panjang: {
      type: DataTypes.INTEGER,
    },
    fasilitas: {
      type: DataTypes.STRING,
    },
    barang_dilarang: {
      type: DataTypes.STRING,
    },
    foto_lahan: {
      type: DataTypes.STRING,
    },
    deskripsi: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "tidak_disewa",
    },
  },
  {
    paranoid: true,
  }
);

newSeq
  .sync()
  .then(() => {
    console.log("Lahan table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });

export const createLahan = async (
  g_id,
  un,
  pr,
  lu,
  le,
  pj,
  fas,
  forb,
  fot_lh,
  desc,
  st
) => {
  const create = await Lahan.create({
    gudang_id: g_id,
    name: un,
    harga: pr,
    luas: lu,
    lebar: le,
    panjang: pj,
    fasilitas: fas,
    barang_dilarang: forb,
    foto_lahan: fot_lh,
    deskripsi: desc,
    status: st,
  });
  console.log(un, "'s id: ", create.id);
  return create.id;
};

export const getLahanbyID = async (id) => {
  const allUser = await Lahan.findOne({
    where: {
      id: id,
    },
  });
  return allUser;
};

export const getLahanGudang = async (id) => {
  const allUser = await Lahan.findAll({
    where: {
      gudang_id: id,
      status: "tidak_disewa",
    },
  });
  return allUser;
};

export const deleteLahan = async (id) => {
  await Lahan.destroy({
    where: {
      id: id,
    },
  });
};

export default Lahan;
