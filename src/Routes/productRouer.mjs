import { Router } from "express";
import db from "../db/db.mjs";

const productRouter = Router();

productRouter.get("/get-all", async (_, res) => {
  const products = await db.product.findMany();
  res.status(200).json({ products });
});

productRouter.post("/add-product", async (req, res) => {
  const resp = await db.product.create({ data: req.body });
  res.status(200).json({ resp });
});

productRouter.get("/get-all/by-id/:id", async (req, res) => {
  const Id = Number(req.params.id);
  const resp = await db.product.findMany({ where: { UserId: Id } });
  res.status(200).json({ resp });
});

productRouter.put("/update/by-product-id/:pid", async (req, res) => {
  const Id = Number(req.params.pid);
  const resp = await db.product.update({ where: { Id: Id }, data: req.body });
  res.status(200).json({ resp });
});

productRouter.delete("/delete/by-id/:id", async (req, res) => {
  const Id = Number(req.params.id);
  const resp = await db.product.delete({ where: { UserId: Id } });
  res.status(200).json({ resp });
});

export default productRouter;
