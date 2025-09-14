import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";

function Nav() {
	const navigate = useNavigate();

	const logout = async () => {
		console.log(localStorage.getItem("username"));
		localStorage.removeItem("username");
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
			return;
		} else {
			navigate("/login");
		}
	};

	return (
		<nav className="bg-white shadow-md px-6 py-4">
			<ul className="flex space-x-6 text-gray-700 font-medium">
				{localStorage.getItem("username") && (
					<>
						<li>{localStorage.getItem("username")}</li>
						<li>
							<Link to="/accounts" className="hover:text-blue-600 transition-colors duration-200">
								Accounts
							</Link>
						</li>
						<li
							className="hover:text-blue-600 transition-colors duration-200 hover:cursor-pointer"
							onClick={logout}
						>
							Logout
						</li>
					</>
				)}

				{!localStorage.getItem("username") && (
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
