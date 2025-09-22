import { Client } from "pg";
import { config } from "../config/config";

const client = new Client({
	connectionString: config.DB_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

client
	.connect()
	.then(() => console.log("Connected to PostgreSQL on Render"))
	.catch((err) => console.error("Connection error", err));

export default client;
