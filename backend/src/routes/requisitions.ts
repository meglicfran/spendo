import express from "express";
import { createRequisitions, getRequisitionById } from "../controllers/requisitionsController";

const requisitionsRouter = express.Router();

requisitionsRouter.post("/", createRequisitions);
requisitionsRouter.get("/:requisitionId", getRequisitionById);

export default requisitionsRouter;
