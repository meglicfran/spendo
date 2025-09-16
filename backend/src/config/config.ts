import dotenv from "dotenv";
dotenv.config();

export const config = {
	ACCESS_TOKEN:
		process.env.ACCESS_TOKEN ??
		(() => {
			throw new Error("ACCESS_TOKEN not set");
		})(),
	BASE_URL:
		process.env.BASE_URL ??
		(() => {
			throw new Error("BASE_URL not set");
		})(),
	DB_PASS:
		process.env.DB_PASS ??
		(() => {
			throw new Error("DB_PASS not set");
		})(),
	DB_USER:
		process.env.DB_USER ??
		(() => {
			throw new Error("DB_USER not set");
		})(),
	DB_URL:
		process.env.DB_URL ??
		(() => {
			throw new Error("DB_URL not set");
		})(),
	REDIS_PASS:
		process.env.REDIS_PASS ??
		(() => {
			throw new Error("REDIS_PASS not set");
		})(),
};
