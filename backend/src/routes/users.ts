import express from "express";
import {
	deleteUser,
	getUserAccounts,
	getUsers,
	addUser,
	updateUser,
	userLogin,
	addUserAccount,
	deleteUserAccount,
} from "../controllers/usersController";

const userRoutes = express.Router();

userRoutes.get("/get", getUsers);
userRoutes.post("/post", addUser);
userRoutes.delete("/delete/:userId", deleteUser);
userRoutes.put("/put/:userId", updateUser);
userRoutes.post("/login", userLogin);
userRoutes.get("/accounts", getUserAccounts);
userRoutes.post("/accounts", addUserAccount);
userRoutes.delete("/accounts", deleteUserAccount);

export default userRoutes;
