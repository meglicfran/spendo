import express from "express";
import { getAccountMetadata, getAccountTransactions } from "../controllers/accountController";

const accountsRoutes = express.Router();

accountsRoutes.get("/:id", getAccountMetadata);
accountsRoutes.get("/:id/transactions/", getAccountTransactions);

export default accountsRoutes;
