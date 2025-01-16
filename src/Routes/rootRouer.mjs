import { Router } from "express";
import userRouter from "./userRouter.mjs";
import productRouter from "./productRouer.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);

export default rootRouter;
