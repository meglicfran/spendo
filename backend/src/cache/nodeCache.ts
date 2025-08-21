import { FlatCache } from "flat-cache";
import { NextFunction, Request, Response } from "express";
import path from "path";
import client from "../database/db";

const cache = new FlatCache({
	ttl: 60000 * 60 * 24, //24 hours
	lruSize: 10000,
	expirationInterval: 60000 * 5,
	persistInterval: 60000,
	cacheDir: "./__cache__",
});

cache.load("cache1");

export const cacheHandler = async (req: Request, res: Response, next: NextFunction) => {
	if (req.method !== "GET") {
		console.error("Cannot cache non-GET requests!");
		return next();
	}

	const key = req.originalUrl;
	if (key === "/users/accounts") {
		console.error("Cannot cache /users/accounts");
		return next();
	}
	const cacheResponse = cache.get(key);

	if (cacheResponse) {
		if ((req.session as any).user === undefined) return res.status(401).json({ summary: "Unauthorized" });

		const userId = (req.session as any).user;
		const { accountId } = req.params;
		if (accountId !== undefined) {
			const query = await client.query("select * from accounts where userId=$1 and accountId=$2", [
				userId,
				accountId,
			]);
			if (query.rowCount == 0) return res.status(401).json({ summary: "Unauthorized" });
		}
		console.log(`Cache hit for ${key}`);
		res.send(cacheResponse);
	} else {
		console.log(`Cache miss for ${key}`);
		const originalJson = res.json.bind(res);
		res.json = (body: any) => {
			if (res.statusCode === 200) {
				console.log(`Cache saved for ${key}`);
				cache.set(key, body);
				cache.save();
			}
			return originalJson(body);
		};
		next();
	}
};
