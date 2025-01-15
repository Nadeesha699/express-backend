import { body, query, param } from "express-validator";

export const valiadteName = body("Name")
  .notEmpty()
  .withMessage("cannot empty")
  .isAlpha()
  .withMessage("require only string");

export const valiadtePassword = body("Password")
  .notEmpty()
  .withMessage("cannot empty")
  .isStrongPassword()
  .withMessage("add strong password");

export const valiadteId = query("id")
  .notEmpty()
  .withMessage("cannot empty")
  .isNumeric()
  .withMessage("only add nubmer");

export const validateParramId = param("id")
  .notEmpty()
  .withMessage("can't empty")
  .isAlpha()
  .withMessage("can't add letter of id");
