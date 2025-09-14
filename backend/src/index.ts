import express from "express";
import accountsRoutes from "./routes/accounts";
import { logger } from "./middleware/logger";
import userRoutes from "./routes/users";
import session from "express-session";
import institutionsRouter from "./routes/institutions";
import requisitionsRouter from "./routes/requisitions";
const cors = require("cors");

const app = express();
const port = 3000;

const corsOptions = {
	origin: "https://react-spendo.vercel.app",
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);
app.use(
	session({
		name: "sId",
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
app.use("/institutions", institutionsRouter);
app.use("/requisitions", requisitionsRouter);

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
