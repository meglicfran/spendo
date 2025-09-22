import { Request, Response } from "express";
import { config } from "../config/config";
import { getValidAccessToken } from "../service/TokenService";

export const createRequisitions = async (req: Request, res: Response) => {
	try {
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}
		const createRequisitionUrl = `/api/v2/requisitions/`;
		const options: RequestInit = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(req.body),
		};
		const response = await fetch(config.BASE_URL + createRequisitionUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};

export const getRequisitionById = async (req: Request, res: Response) => {
	try {
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}
		const { requisitionId } = req.params;
		const getRequisitionByIdUrl = `/api/v2/requisitions/${requisitionId}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + getRequisitionByIdUrl, options);
		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).send("Internal server error");
	}
};
