import { Request, Response } from "express";
import client from "../database/db";
import { config } from "../config/config";

export const getInstitutionsByCountry = async (req: Request, res: Response) => {
	try {
		const country = req.query.country as string;

		const getInstitutionsByCountryUrl = `/api/v2/institutions/?country=${country}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${config.ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
		};
		const response = await fetch(config.BASE_URL + getInstitutionsByCountryUrl, options);
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
