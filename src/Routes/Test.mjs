import { json, Router } from "express";
import db from "../db/db.mjs";

const testRouter = Router();

testRouter.post("/add-user", async (req, res) => {
  const resp = await db.test.create({ data: req.body });
  res.status(200).json({ resp });
});

testRouter.delete("/delete/user/by-id", async (req, res) => {
  const { Id } = req.query;
  const a = Number(Id);
  const resp = await db.test.delete({ where: { Id: a } });
  res.status(200).json({ resp });
});

testRouter.put("/update/user/by-id", async (req, res) => {
  const { id } = req.query;
  const Id = Number(id);
  const { name } = req.body;
  const resp = await db.test.update({
    where: { Id: Id },
    data: { Name: name },
  });
  res.status(200).json({ resp });
});

testRouter.get("/get-all-users", async (_, res) => {
  const users = await db.test.findMany();
  res.status(200).json({ users });
});

testRouter.get("/get-user/by-id", async (req, res) => {
  const { id } = req.query;
  const Id = Number(id);
  const resp = await db.test.findUnique({ where: { Id: Id } });
  res.status(200).json({ resp });
});

export default testRouter;
