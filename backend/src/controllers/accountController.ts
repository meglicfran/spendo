import { Request, Response } from "express";
import { config } from "../config/config";
import client from "../database/db";
import { getValidAccessToken } from "../service/TokenService";

export const getAccountMetadata = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });
		const { accountId } = req.params;
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}

		const accountMetadataUrl = `/api/v2/accounts/${accountId}/`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountMetadataUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ summary: "Internal server error" });
	}
};

export const getAccountTransactions = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });

		const userId = (req.session as any).user;
		const { accountId } = req.params;
		const date_from = req.query.date_from as string;
		const date_to = req.query.date_to as string;
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}

		const query = await client.query("select * from accounts where userId=$1 and accountId=$2", [
			userId,
			accountId,
		]);
		if (query.rowCount == 0) return res.status(401).json({ summary: "Not logged in" });

		const accountTransactionsUrl = `/api/v2/accounts/${accountId}/transactions/?date_from=${date_from}&date_to=${date_to}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountTransactionsUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ summary: "Internal server error" });
	}
};

export const getAccountBalances = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });

		const userId = (req.session as any).user;
		const { accountId } = req.params;
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}

		const query = await client.query("select * from accounts where userId=$1 and accountId=$2", [
			userId,
			accountId,
		]);
		if (query.rowCount == 0) return res.status(401).json({ summary: "Not logged in" });

		const accountBalancesUrl = `/api/v2/accounts/${accountId}/balances`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountBalancesUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ summary: "Internal server error" });
	}
}

export const getAccountDetails = async (req: Request, res: Response) => {
	try {
		if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Not logged in" });

		const userId = (req.session as any).user;
		const { accountId } = req.params;
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}

		const query = await client.query("select * from accounts where userId=$1 and accountId=$2", [
			userId,
			accountId,
		]);
		if (query.rowCount == 0) return res.status(401).json({ summary: "Not logged in" });

		const accountDetailsUrl = `/api/v2/accounts/${accountId}/details`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountDetailsUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ summary: "Internal server error" });
	}
}