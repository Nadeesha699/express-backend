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
  const resp = await db.product.findUnique({ where: { Id: Id } });
  res.status(200).json({ resp });
});



export default productRouter;
