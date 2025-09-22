import { QueryResult } from "pg";
import client from "../database/db";
import { config } from "../config/config";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

interface AccessToken {
	id: number;
	access_token: string;
	access_expires: Date;
	refresh_token: string;
	refresh_expires: Date;
}

export const getValidAccessToken = async (): Promise<String | null> => {
	const tokens = await getAccessToken();
	if (tokens !== null && isValid(tokens.access_expires)) {
		return tokens.access_token;
	}
	const newToken = await refreshAndGetTokenAtomic(tokens);
	return newToken;
};

const getAccessToken = async (): Promise<AccessToken | null> => {
	try {
		const query = await client.query("Select * from tokens");

		if (query.rowCount !== 1) {
			return null;
		}

		return {
			access_token: query.rows[0].access_token,
			access_expires: new Date(query.rows[0].access_expires),
			refresh_token: query.rows[0].refresh_token,
			refresh_expires: new Date(query.rows[0].refresh_token),
			id: query.rows[0].id,
		};
	} catch (err) {
		console.error("TokenService getAccessToken() error: " + err);
		return null;
	}
};

const refreshAndGetTokenAtomic = async (token: AccessToken | null): Promise<String | null> => {
	await mutex.acquire();
	console.log("refreshAndGetTokenAtomic critical seciton");

	if (token !== null && isValid(token.access_expires)) {
		return token.access_token;
	}

	const newToken = await refreshAndGetToken(token);
	console.log("refreshAndGetTokenAtomic release");
	mutex.release();
	return newToken;
};

const refreshAndGetToken = async (tokens: AccessToken | null): Promise<String | null> => {
	if (tokens !== null && isValid(tokens.refresh_expires)) {
		return await refreshAccessToken(tokens);
	}
	return await generateNewTokens();
};

const refreshAccessToken = async (tokens: AccessToken | null): Promise<String | null> => {
	if (tokens === null) return null;

	const refreshTokenURL = "/api/v2/token/refresh/";
	const options: RequestInit = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			refresh: tokens.refresh_token,
		}),
	};
	const response = await fetch(config.BASE_URL + refreshTokenURL, options);
	const data = await response.json();
	if (response.status != 200) {
		console.error("TokenService refreshAccessToken error: " + JSON.stringify(data));
		return null;
	}

	const accessToken = data.access;
	const accessExpires = new Date(Date.now() + data.access_expires * 1000);

	try {
		await client.query(
			`UPDATE tokens SET access_token = $1, access_expires = $2, updated_at = NOW() WHERE id = $3`,
			[accessToken, accessExpires, tokens.id]
		);
		return accessToken;
	} catch (err) {
		console.error("TokenService refreshAccessToken error:" + err);
		return null;
	}
};

const generateNewTokens = async (): Promise<String | null> => {
	const newTokenUrl = "/api/v2/token/new/";
	const options: RequestInit = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			secret_id: config.SECRET_ID,
			secret_key: config.SECRET_KEY,
		}),
	};
	const response = await fetch(config.BASE_URL + newTokenUrl, options);
	const data = await response.json();
	if (response.status != 200) {
		console.error("TokenService generateNewTokens error: " + data);
		return null;
	}

	const accessToken = data.access;
	const accessExpires = new Date(Date.now() + data.access_expires * 1000);
	const refreshToken = data.refresh;
	const refreshExpires = new Date(Date.now() + data.refresh_expires * 1000);

	try {
		await client.query(`Delete from tokens;`);
		await client.query(
			"INSERT INTO tokens (access_token, access_expires, refresh_token, refresh_expires) VALUES ($1, $2, $3, $4)",
			[accessToken, accessExpires, refreshToken, refreshExpires]
		);
		return accessToken;
	} catch (err) {
		console.error("TokenService generateNewTokens error: " + err);
		return null;
	}
};

const isValid = (access_expires: Date): boolean => {
	if (access_expires === null) return false;
	return access_expires.getTime() > Date.now();
};
