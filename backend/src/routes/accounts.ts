import express from "express";
import { getAccountBalances, getAccountDetails, getAccountMetadata, getAccountTransactions } from "../controllers/accountController";
import { cacheHandler } from "../cache/nodeCache";

const accountsRoutes = express.Router();

accountsRoutes.get("/:accountId", getAccountMetadata);
accountsRoutes.get("/:accountId/balances", cacheHandler, getAccountBalances);
accountsRoutes.get("/:accountId/details", cacheHandler, getAccountDetails);
accountsRoutes.get("/:accountId/transactions/", cacheHandler, getAccountTransactions);

export default accountsRoutes;
