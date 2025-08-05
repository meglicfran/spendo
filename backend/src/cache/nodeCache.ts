import { FlatCache } from "flat-cache";
import { NextFunction, Request, Response } from "express";
import path from "path";

const cache = new FlatCache({
	ttl: 60000 * 60 * 24, //24 hours
	lruSize: 10000,
	expirationInterval: 60000 * 5,
	persistInterval: 60000,
	cacheDir: "./__cache__",
});

cache.load("cache1");

export const cacheHandler = (req: Request, res: Response, next: NextFunction) => {
	if (req.method !== "GET") {
		console.error("Cannot cache non-GET requests!");
		return next();
	}

	const key = req.originalUrl;
	const cacheResponse = cache.get(key);

	if (cacheResponse) {
		console.log(`Cache hit for ${key}`);
		res.send(cacheResponse);
	} else {
		console.log(`Cache miss for ${key}`);
		console.log(cache.keys());
		const originalJson = res.json.bind(res);
		res.json = (body: any) => {
			cache.set(key, body);
			cache.save();
			return originalJson(body);
		};
		next();
	}
};
