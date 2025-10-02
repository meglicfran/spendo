import express from "express";
import { createRequisitions, deleteRequisition, getCompanyRequisitions, getRequisitionById } from "../controllers/requisitionsController";
import { adminAuth } from "../middleware/authMiddleware";

const requisitionsRouter = express.Router();

requisitionsRouter.post("/", createRequisitions);
requisitionsRouter.get("/:requisitionId", getRequisitionById);
requisitionsRouter.get("/", adminAuth, getCompanyRequisitions);
requisitionsRouter.delete("/:requisitionId", adminAuth, deleteRequisition)

export default requisitionsRouter;
