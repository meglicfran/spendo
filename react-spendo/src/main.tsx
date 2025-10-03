import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import AccountsPage from "./pages/AccountsPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Nav from "./components/Nav.tsx";
import AddAccountPage from "./pages/AddAccountPage.tsx";
import AccountsAddedPage from "./pages/AccountsAddedPage.tsx";
import { UserContextProvider } from "./components/UserContextProvider.tsx";
import RequisitionsPage from "./pages/RequisitionsPage.tsx";
import { AdminProtectedRoute, ProtectedRoute } from "./components/ProtectedRoute.tsx";

export const BASE_URL = "https://spendo-backend.onrender.com";
//export const BASE_URL = "http://localhost:3000";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Nav />,
	},
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
	{
		path: "/add",
		element: <AddAccountPage />,
	},
	{
		path: "/added",
		element: <AccountsAddedPage />,
	},
	{
		path: "/requisitions",
		element: <AdminProtectedRoute><RequisitionsPage /></AdminProtectedRoute>
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	</StrictMode>
);
