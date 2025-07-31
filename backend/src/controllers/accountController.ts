import { Request, Response } from "express";
import { config } from "../config/config";

export const getAccountMetadata = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const accountMetadataUrl = `/api/v2/accounts/${id}/`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${config.ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountMetadataUrl, options);
		if (!response.ok) {
			return res.status(response.status).send("Error fetching account metadata.");
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const getAccountTransactions = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const date_from = req.query.date_from as string;
		const date_to = req.query.date_to as string;
		const accountTransactionsUrl = `/api/v2/accounts/${id}/transactions/?date_from=${date_from}&date_to=${date_to}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${config.ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + accountTransactionsUrl, options);
		if (!response.ok) {
			return res.status(response.status).send("Error fetching account metadata.");
		}

		const data = await response.json();
		return res.status(200).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};
