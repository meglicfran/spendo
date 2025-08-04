import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AccountsPage from "./pages/AccountsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const router = createBrowserRouter([
	{
		path: "/account/:accountId",
		element: <Dashboard />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/register",
		element: <RegisterPage />,
	},
	{
		path: "/accounts",
		element: <AccountsPage />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
