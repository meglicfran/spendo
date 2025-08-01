import express from "express";
import accountsRoutes from "./routes/accounts";
import { logger } from "./middleware/logger";
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
	res.send("Hello from TypeScript backend!");
});

app.use("/api/v2/accounts", accountsRoutes);
