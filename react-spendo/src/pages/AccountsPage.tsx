import { useEffect, useState } from "react";
import AccountList from "../components/AccountList";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import { BASE_URL } from "../main";

function AccountsPage() {
	const [accounts, updateAccounts] = useState([]);

	const fetchAccounts = async () => {
		const getAccountsUrl = `/users/accounts`;
		const options: RequestInit = {
			method: "GET",
			credentials: "include",
		};
		const response = await fetch(BASE_URL + getAccountsUrl, options);
		if (!response.ok) {
			console.log(`Error fetching account status = ${response.status}`);
			return;
		}
		const data = await response.json();
		updateAccounts(data);
	};

	useEffect(() => {
		fetchAccounts();
	}, []);

	return (
		<>
			<Nav />
			<div className="max-w-7xl mx-auto p-6 space-y-6">
				<AccountList accounts={accounts} />
				<div className="flex justify-center">
					<Link
						to="/add"
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition"
					>
						Add account
					</Link>
				</div>
			</div>
		</>
	);
}

export default AccountsPage;
