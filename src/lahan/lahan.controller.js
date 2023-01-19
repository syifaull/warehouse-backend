import JSONtoken from "jsonwebtoken";
import { getGudangID } from "../gudang/gudang.model.js";
import {
  createLahan,
  deleteLahan,
  editLahan,
  getLahanbyID,
  getLahanGudang,
} from "./lahan.model.js";

// create new lahan
export const createLahanRest = async (req, res) => {
  const jwt = req.headers["authorization"];
  const bearer = jwt.split(" ");
  const token = bearer[1];
  const us_id = JSONtoken.verify(token, process.env.JWT_SECRET).id;

  const gudang = await getGudangID(us_id);
  const gudang_id = gudang.id;
  // console.log("ini gudang id", gudang);

  const {
    name,
    harga,
    luas,
    lebar,
    panjang,
    fasilitas,
    barang_dilarang,
    foto_lahan,
    deskripsi,
    status,
  } = req.body;

  if (!(name && harga)) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: "Some input are required",
      },
      data: {},
    });
  }

  const respModel = await createLahan(
    gudang_id,
    name,
    harga,
    luas,
    lebar,
    panjang,
    fasilitas,
    barang_dilarang,
    foto_lahan,
    deskripsi,
    status
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success add lahan",
    },
    data: {
      id: respModel,
    },
  });
};

// get detail lahan
export const getLahanRest = async (req, res) => {
  const id = req.params.id;

  const respModel = await getLahanbyID(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get detail lahan",
    },
    data: { respModel },
  });
};

// get daftar lahan dalam gudang
export const getLahanGudangRest = async (req, res) => {
  const id = req.params.id;

  const respModel = await getLahanGudang(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success get daftar lahan",
    },
    data: { respModel },
  });
};

// delete lahan
export const deleteLahanRest = async (req, res) => {
  const id = req.params.id;

  deleteLahan(id);
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success delete lahan",
    },
  });
};

export const editLahanRest = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    harga,
    luas,
    lebar,
    panjang,
    fasilitas,
    barang_dilarang,
    foto_lahan,
    deskripsi,
  } = req.body;
  const respModel = await editLahan(
    id,
    name,
    harga,
    luas,
    lebar,
    panjang,
    fasilitas,
    barang_dilarang,
    foto_lahan,
    deskripsi
  );
  return res.status(200).json({
    meta: {
      code: 200,
      message: "Success update lahan",
    },
    data: {},
  });
};
