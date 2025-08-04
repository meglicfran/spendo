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
};
