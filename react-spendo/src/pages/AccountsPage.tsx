import { useEffect, useState } from "react";
import AccountList from "../components/AccountList";

const USER_ID = "2";
const BASE_URL = "http://localhost:3000";

function AccountsPage() {
	const [accounts, updateAccounts] = useState([]);

	const fetchAccounts = async () => {
		const getAccountsUrl = `/users/accounts/${USER_ID}`;
		const options: RequestInit = {
			method: "GET",
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
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			<AccountList accounts={accounts} />
		</div>
	);
}

export default AccountsPage;
