import express from "express";
import { getInstitutionsByCountry } from "../controllers/institutionsController";
import { auth } from "../middleware/authMiddleware";

const institutionsRouter = express.Router();

institutionsRouter.get("/", auth, getInstitutionsByCountry);

export default institutionsRouter;
