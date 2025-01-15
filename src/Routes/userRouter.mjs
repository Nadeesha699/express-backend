import { Router } from "express";
import db from "../db/db.mjs";

const userRouter = Router();

userRouter.get("/get-all", async (_, res) => {
  const users = await db.user.findMany();
  res.status(200).json({ users });
});

userRouter.get("/get-all/by-id", async (req, res) => {
  const Id = Number(req.query.id);
  const user = await db.user.findUnique({ where: { Id: Id } });
  res.status(200).json({ user });
});

userRouter.post("/register", async (req, res) => {
  const result = await db.user.create({ data: req.body });
  res.status(200).json({ result });
});

userRouter.get("/login", async (req, res) => {
  const resp = await db.user.findFirst({
    where: { Name: req.query.Name, Password: req.query.Password },
  });
  res.status(200).json({ resp });
});

userRouter.put("/update/by-id/:id", async (req, res) => {
  const Id = Number(req.params.id);
  const resp = await db.user.update({ where: { Id: Id }, data: req.body });
  res.status(200).json({ resp });
});

userRouter.delete("/delete/by-id/:id", async (req, res) => {
  const Id = Number(req.params.id);
  const resp = await db.user.delete({ where: { Id: Id } });
  res.status(200).json({ resp });
});

export default userRouter;
