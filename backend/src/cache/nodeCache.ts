import { NextFunction, Request, Response } from "express";
import { createClient } from "redis";
import { config } from "../config/config";
import client from "../database/db";

const TTL = 60 * 60 * 24; // 24h

const redis = createClient({
	username: "default",
	password: config.REDIS_PASS,
	socket: {
		host: "redis-12403.c338.eu-west-2-1.ec2.redns.redis-cloud.com",
		port: 12403,
	},
});

redis.on("error", (err) => console.log("Redis Client Error", err));

export const initRedis = async () => {
	if (!redis.isOpen) {
		await redis.connect();
	}
};

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
	const cacheResponse = await redis.get(key);

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
		res.send(JSON.parse(cacheResponse));
	} else {
		console.log(`Cache miss for ${key}`);
		const originalJson = res.json.bind(res);
		res.json = (body: any) => {
			if (res.statusCode === 200) {
				console.log(`Cache saved for ${key}`);
				redis.setEx(key, TTL, JSON.stringify(body));
			}
			return originalJson(body);
		};
		next();
	}
};
