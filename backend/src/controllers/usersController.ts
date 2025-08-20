import { Request, Response } from "express";
import client from "../database/db";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const query = await client.query("Select * from users");
		console.log(query.rows);
		res.status(200).json(query.rows);
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const addUser = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user !== undefined) return res.status(200).send("Already logged in");
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [
			username,
			password,
		]);
		(req.session as any).user = query.rows[0].userid;
		res.status(200).send(query.rows[0]);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (userId === undefined) return res.status(400).send("Missing userId.");
		const query = await client.query(`Delete from users where userId = $1;`, [userId]);
		res.status(200).send("User deleted");
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (userId === undefined) return res.status(400).send("Missing userId.");
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(`Update users set username = $1, password = $2 where userId = $3`, [
			username,
			password,
			userId,
		]);
		res.status(200).send(`User ${userId} updated`);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const userLogin = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user !== undefined) return res.status(200).send("Already logged in");
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(`Select * from users where username = $1`, [username]);
		if (query.rowCount === 1 && query.rows[0].password === password) {
			(req.session as any).user = query.rows[0].userid;
			res.status(200).send("Login successful");
		} else {
			res.status(401).send("Wrong username or password");
		}
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const userLogout = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).send("Not logged in.");
		res.clearCookie("sId", {
			secure: false,
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const getUserAccounts = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).send("Not logged in.");
		const userId = (req.session as any).user;

		const query = await client.query(`select accountId, iban, institutionId from accounts where userId = $1`, [
			userId,
		]);
		res.status(200).json(query.rows);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const addUserAccount = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).send("Not logged in.");
		const { accountId, iban, institutionId } = req.body;
		const userId = (req.session as any).user;
		if (accountId === undefined || userId === undefined || iban === undefined || institutionId == undefined) {
			console.log(accountId, iban, institutionId, userId);
			return res.status(400).send("Invalid request body");
		}
		const query = await client.query(
			`INSERT INTO accounts (accountID, userId, IBAN, institutionID) VALUES ($1, $2, $3, $4);`,
			[accountId, userId, iban, institutionId]
		);
		res.status(200).send("Account added");
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const deleteUserAccount = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).send("Not logged in.");
		const userId = (req.session as any).user;
		const { accountId } = req.body;
		if (accountId === undefined || userId === undefined) return res.status(400).send("Invalid request");
		const query = await client.query(`Delete from accounts where accountId = $1 and userId = $2;`, [
			accountId,
			userId,
		]);
		res.status(200).send(`Account ${accountId} deleted`);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};
