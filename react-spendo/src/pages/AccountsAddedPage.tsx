import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Account } from "../components/AccountList";
import Nav from "../components/Nav";
import AccountList from "../components/AccountList";
import { BASE_URL } from "../main";
import { useUserContext } from "../components/UserContextProvider";

function AccountsAddedPage() {
	const [searchParams] = useSearchParams();

	const [accounts, updateAccounts] = useState<Account[]>([]);

	const navigate = useNavigate();
	const userContext = useUserContext();

	const addUserAccount = async (accountId: string, iban: string, institution_id: string) => {
		const addUserAccountUrl = "/users/accounts";
		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				accountId: accountId,
				iban: iban,
				institutionId: institution_id,
			}),
		};

		const response = await fetch(BASE_URL + addUserAccountUrl, options);
		if (!response.ok) {
			console.log(`Error add user account status = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
		console.log(`Account ${accountId} added to user.`);
	};

	const fetchAccounts = async () => {
		const getRequisitionByIdUrl = `/requisitions/${searchParams.get("ref")}`;
		const options: RequestInit = {
			method: "GET",
			credentials: "include",
		};
		const response = await fetch(BASE_URL + getRequisitionByIdUrl, options);
		if (!response.ok) {
			console.log(`Error fetching requisition by Id, status = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
		const data = await response.json();

		const newAccounts: Account[] = [];
		for (var accountId of data.accounts) {
			var getAccountMetadataUrl = `/accounts/${accountId}/`;
			const metadataResponse = await fetch(BASE_URL + getAccountMetadataUrl, options);
			const metadata = await metadataResponse.json();
			addUserAccount(metadata.id, metadata.iban, metadata.institution_id);
			newAccounts.push({
				accountid: metadata.id,
				iban: metadata.iban,
				institutionid: metadata.institution_id,
			});
		}
		updateAccounts(newAccounts);
	};

	useEffect(() => {
		fetchAccounts();
	}, []);
	return (
		<>
			<Nav />
			<div className="max-w-6xl mx-auto px-6 py-10">
				<h2 className="text-3xl font-bold text-gray-800 mb-8">Added:</h2>
				<AccountList accounts={accounts} />
			</div>
		</>
	);
}

export default AccountsAddedPage;
