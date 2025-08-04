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
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(
			`INSERT INTO users (username, password) VALUES ('${username}', '${password}');`
		);
		console.log(query.rows);
		res.status(200).send("User added");
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (userId === undefined) return res.status(400).send("Missing userId.");
		console.log(`Delete from users where userId = ${userId};`);
		const query = await client.query(`Delete from users where userId = ${userId};`);
		res.status(200).send("User deleted");
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (userId === undefined) return res.status(400).send("Missing userId.");
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(
			`Update users set username = '${username}', password = '${password}' where userId = ${userId}`
		);
		res.status(200).send(`User ${userId} updated`);
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const userLogin = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (username === undefined || password === undefined)
			return res.status(400).send("Missing username or password");

		const query = await client.query(`Select * from users where username = '${username}'`);
		if (query.rowCount === 1 && query.rows[0].password === password) {
			res.status(200).send("Login successful");
		} else {
			res.status(401).send("Wrong username or password");
		}
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const getUserAccounts = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;
		if (userId === undefined) return res.status(400).send("Missing userId.");

		const query = await client.query(`select accountId, iban, institutionId from accounts where userId=${userId}`);
		console.log(query.rows);
		res.status(200).json(query.rows);
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const addUserAccount = async (req: Request, res: Response) => {
	try {
		const { accountId, userId, iban, institutionId } = req.body;
		if (accountId === undefined || userId === undefined || iban === undefined || institutionId == undefined)
			return res.status(400).send("Invalid request body");
		const query = await client.query(
			`INSERT INTO accounts (accountID, userId, IBAN, institutionID) VALUES ('${accountId}', ${userId}, '${iban}', '${institutionId}');`
		);
		res.status(200).send("Account added");
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};

export const deleteUserAccount = async (req: Request, res: Response) => {
	try {
		const { accountId, userId } = req.body;
		if (accountId === undefined || userId === undefined) return res.status(400).send("Invalid request body");
		const query = await client.query(
			`Delete from accounts where accountId = '${accountId}' and userId = ${userId};`
		);
		res.status(200).send("Account deleted");
	} catch (error) {
		console.error("Query error", error);
		res.status(500).send(error);
	}
};
