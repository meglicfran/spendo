import express from "express";
import { getAccountMetadata, getAccountTransactions } from "../controllers/accountController";
import { cacheHandler } from "../cache/nodeCache";

const accountsRoutes = express.Router();

accountsRoutes.use("/:accountId", cacheHandler);
accountsRoutes.get("/:accountId", getAccountMetadata);
accountsRoutes.get("/:accountId/transactions/", getAccountTransactions);

export default accountsRoutes;
