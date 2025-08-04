import express from "express";
import accountsRoutes from "./routes/accounts";
import { logger } from "./middleware/logger";
import userRoutes from "./routes/users";
import session from "express-session";

const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use(
	session({
		secret: `idegas`,
		saveUninitialized: false,
		resave: false,
		cookie: {
			secure: false,
			maxAge: 60000 * 60,
		},
	})
);

app.get("/", (req, res) => {
	res.send("Hello from TypeScript backend!");
});

app.use("/accounts", accountsRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
