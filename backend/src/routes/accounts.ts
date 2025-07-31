import express from "express";
import { getAccountMetadata } from "../controllers/accountController";

const accountsRoutes = express.Router();

accountsRoutes.get("/:id", getAccountMetadata);

export default accountsRoutes;
