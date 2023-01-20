var koneksi = require("../koneksi");
const Sequelize = require("sequelize");
const saksake = koneksi.define(
  "order",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    tiket_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    response_midtrans: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
module.exports = saksake;
