import express from "express";
import { getAccountMetadata, getAccountTransactions } from "../controllers/accountController";

const accountsRoutes = express.Router();

accountsRoutes.get("/:accountId", getAccountMetadata);
accountsRoutes.get("/:accountId/transactions/", getAccountTransactions);

export default accountsRoutes;
