import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav className="bg-white shadow-md px-6 py-4">
			<ul className="flex space-x-6 text-gray-700 font-medium">
				<li>
					<Link to="/accounts" className="hover:text-blue-600 transition-colors duration-200">
						Accounts
					</Link>
				</li>
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
			</ul>
		</nav>
	);
}

export default Nav;
