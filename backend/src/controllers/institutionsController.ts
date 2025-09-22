import { Request, Response } from "express";
import { config } from "../config/config";
import { getValidAccessToken } from "../service/TokenService";

export const getInstitutionsByCountry = async (req: Request, res: Response) => {
	try {
		const country = req.query.country as string;
		const accessToken = await getValidAccessToken();
		if (accessToken === null) {
			console.error("Invalid access token");
			return res.status(500).json({ summary: "Internal server error" });
		}

		const getInstitutionsByCountryUrl = `/api/v2/institutions/?country=${country}`;
		const options: RequestInit = {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
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
