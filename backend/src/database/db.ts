import { Client } from "pg";
import { config } from "../config/config";

const client = new Client({
	user: config.DB_USER,
	host: "localhost",
	database: "spendo",
	password: config.DB_PASS,
	port: 5432,
});

client
	.connect()
	.then(() => console.log("Connected to PostgreSQL"))
	.catch((err) => console.error("Connection error", err));

export default client;
