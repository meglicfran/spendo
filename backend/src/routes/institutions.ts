import express from "express";
import { getInstitutionsByCountry } from "../controllers/institutionsController";

const institutionsRouter = express.Router();

institutionsRouter.get("/", getInstitutionsByCountry);

export default institutionsRouter;
