import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";
import { useUserContext } from "./UserContextProvider";

function Nav() {
	const navigate = useNavigate();
	const userContext = useUserContext();

	const logout = async () => {
		userContext.setUser(null);

		const logoutUrl = `/users/logout`;
		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		};
		const response = await fetch(BASE_URL + logoutUrl, options);
		if (!response.ok) {
			console.log(`Error logging out = ${response.status}`);
			alert(`Error logging out = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		} else {
			navigate("/login");
		}
	};

	return (
		<nav className="bg-white shadow-md px-6 py-4">
			<ul className="flex space-x-6 text-gray-700 font-medium">
				{userContext.user && (
					<>
						<li>{userContext.user.username}</li>
						<li>
							<Link to="/accounts" className="hover:text-blue-600 transition-colors duration-200">
								Accounts
							</Link>
						</li>
						{userContext.user.isAdmin && (
							<li>
								<Link to="/requisitions" className="hover:text-blue-600 transition-colors duration-200">
									Requisitions
								</Link>
							</li>
						)}
						<li
							className="hover:text-blue-600 transition-colors duration-200 hover:cursor-pointer"
							onClick={logout}
						>
							Logout
						</li>
					</>
				)}

				{!userContext.user && (
					<>
						<li>
							<Link to="/login" className="hover:text-blue-600 transition-colors duration-200">
								Login
							</Link>
						</li>
						<li>
							<Link to="/register" className="hover:text-blue-600 transition-colors duration-200">
								Register
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Nav;
