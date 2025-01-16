import { body, query, param } from "express-validator";

export const validateBodyName = body("Name")
  .notEmpty()
  .withMessage("cannot empty")
  .isAlpha()
  .withMessage("require only string");

export const validateBodyUserName = body("UserName")
  .notEmpty()
  .withMessage("cannot empty");

export const validateBodyPassword = body("Password")
  .notEmpty()
  .withMessage("cannot empty")
  .isStrongPassword()
  .withMessage("add strong password");

export const validateQueryId = query("id")
  .notEmpty()
  .withMessage("cannot empty")
  .isNumeric()
  .withMessage("only add nubmer");

export const validateParramId = param("id")
  .notEmpty()
  .withMessage("cannot empty")
  .isNumeric()
  .withMessage("only add nubmer");

export const validateBodyId = body("UserId")
  .notEmpty()
  .withMessage("can't empty")
  .isNumeric()
  .withMessage("can't add letter");

export const validateQueryUserName = query("UserName")
  .notEmpty()
  .withMessage("cannot empty");

export const validateQueryPassword = query("Password")
  .notEmpty()
  .withMessage("cannot empty")
  .isStrongPassword()
  .withMessage("add strong password");
