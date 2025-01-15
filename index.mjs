import express from "express";
import rootRouter from "./src/Routes/rootRouer.mjs";

const server = express();

server.use(express.json());
server.use("/api", rootRouter);
server.listen(4002, () => {
  console.log("running....");
});
