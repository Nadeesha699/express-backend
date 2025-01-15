import { Router } from "express";
import db from "../db/db.mjs";
import {
  valiadteBodyId,
  valiadteName,
  validateParramId,
} from "../validators/validators.mjs";
import { body, validationResult } from "express-validator";

const productRouter = Router();

productRouter.get("/get-all", async (_, res) => {
  const products = await db.product.findMany();
  products.length !== 0
    ? res.status(200).json({ data: products, success: true })
    : res.status(200).json({ message: "can't find products", success: false });
});

productRouter.post(
  "/add-product",
  valiadteBodyId,
  valiadteName,
  async (req, res) => {
    const validationResults = validationResult(req);
    if (validationResults.array().length === 0) {
      const resp = await db.product.create({ data: req.body });
      res.status(200).json({ data: resp, success: true });
    } else {
      res.status(500).json({ message: "can't register", success: false });
    }
  }
);

productRouter.get("/get-all/by-id/:id", validateParramId, async (req, res) => {
  const validationResults = validationResult(req);
  if (validationResults.array().length === 0) {
    const Id = Number(req.params.id);
    const resp = await db.product.findMany({ where: { UserId: Id } });
    res.status(200).json({ data: resp, success: true });
  } else {
    res.status(500).json({ message: "can't found", success: false });
  }
});

productRouter.put(
  "/update/by-product-id/:id",
  validateParramId,
  valiadteName,
  valiadteBodyId,
  async (req, res) => {
    try {
      const validationResults = validationResult(req);
      if (validationResults.array().length === 0) {
        const Id = Number(req.params.id);
        const resp = await db.product.update({
          where: { Id: Id },
          data: req.body,
        });
        res.status(200).json({ data: resp, success: true });
      } else {
        res.status(500).json({ message: "can't update", success: false });
      }
    } catch (error) {}
    res.status(500).json({ message: "can't update", success: false });
  }
);

productRouter.delete(
  "/delete/by-id/:id/",
  validateParramId,
  async (req, res) => {
    const validationResults = validationResult(req);
    if (validationResults.array().length === 0) {
      const Id = Number(req.params.id);
      const resp = await db.product.deleteMany({ where: { UserId: Id } });
      res.status(200).json({ data: resp, success: true });
    } else {
      res.status(500).json({ message: "not delete", success: false });
    }
  }
);

export default productRouter;
