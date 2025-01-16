import { json, query, Router } from "express";
import db from "../db/db.mjs";
import { validationResult } from "express-validator";
import {
  validateQueryId,
  validateBodyUserName,
  validateBodyName,
  validateBodyPassword,
  validateParramId,
  validateQueryUserName,
  validateQueryPassword,
} from "../validators/validators.mjs";
import { tokenGenerator, verifyToken } from "../Auth/JWT.mjs";

const userRouter = Router();

userRouter.get("/get-all", async (_, res) => {
  const users = await db.user.findMany();
  users.length !== 0
    ? res.status(200).json({ data: users, success: true })
    : res.status(500).json({ message: "no data found", success: false });
});

userRouter.get("/get-user/by-id", validateQueryId, async (req, res) => {
  const validationResults = validationResult(req);
  if (validationResults.array().length === 0) {
    const Id = Number(req.query.id);
    const user = await db.user.findUnique({ where: { Id: Id } });
    res.status(200).json({ data: user, success: true });
  } else {
    res.status(500).json({ message: "can't find user", success: false });
  }
});

userRouter.post(
  "/register",
  validateBodyUserName,
  validateBodyName,
  validateBodyPassword,
  // body("Password")
  //   .notEmpty()
  //   .withMessage("cannot empty")
  //   .isStrongPassword()
  //   .withMessage("add strong password"),
  async (req, res) => {
    const valldationResults = validationResult(req);
    if (valldationResults.array().length === 0) {
      const result = await db.user.create({
        data: req.body,
      });
      res.status(200).json({ data: result, success: true });
    } else {
      res.status(500).json({ message: "not registered", success: false });
    }
  }
);

userRouter.get(
  "/login",
  validateQueryUserName,
  validateQueryPassword,
  async (req, res) => {
    const validationResults = validationResult(req);
    if (validationResults.array().length === 0) {
      const payload = {
        userName: req.query.UserName,
      };
      const token = tokenGenerator(payload);
      const resp = await db.user.findUnique({
        where: { UserName: req.query.UserName, Password: req.query.Password },
      });
      res.status(200).json({ data: resp, success: true, token: token });
    } else {
      res.status(500).json({ message: "can't login", success: false });
    }
  }
);

userRouter.put(
  "/update/by-id/:id",
  validateParramId,
  validateBodyUserName,
  validateBodyPassword,
  validateBodyName,
  async (req, res) => {
    const validationResults = validationResult(req);
    if (validationResults.array().length === 0) {
      const Id = Number(req.params.id);
      const resp = await db.user.update({ where: { Id: Id }, data: req.body });
      res.status(200).json({ data: resp, success: true });
    } else {
      res.status(500).json({ message: "can't update", success: false });
    }
  }
);

userRouter.delete("/delete/by-id/:id", validateParramId, async (req, res) => {
  const validationResults = validationResult(req);
  if (validationResults.array().length === 0) {
    const Id = Number(req.params.id);
    const resp = await db.user.delete({ where: { Id: Id } });
    res.status(200).json({ data: resp, success: true });
  } else {
    res.status(500).json({ message: "can't delete", success: false });
  }
});

userRouter.post("/validateUser", (req, res) => {
  try {
    const token = req.headers.authorization;
    const value = verifyToken(token.split(" ")[1]);
    if (value) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

export default userRouter;
