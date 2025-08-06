import { Request, Response } from "express";
import { config } from "../config/config";

export const createRequisitions = async (req: Request, res: Response) => {
	try {
		const createRequisitionUrl = `/api/v2/requisitions/`;
		const options: RequestInit = {
			method: "POST",
			headers: {
				Authorization: `Bearer ${config.ACCESS_TOKEN}`,
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
		const { requisitionId } = req.params;
		const getRequisitionByIdUrl = `/api/v2/requisitions/${requisitionId}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${config.ACCESS_TOKEN}`,
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
