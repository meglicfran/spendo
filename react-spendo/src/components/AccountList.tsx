import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";
import { useUserContext } from "./UserContextProvider";

export interface Account {
	accountid: string;
	iban: string;
	institutionid: string;
}

interface AccountsProp {
	accounts: Account[];
}

function AccountList({ accounts }: AccountsProp) {
	const navigate = useNavigate();
	const userContext = useUserContext();

	const accountClicked = (accountId: string) => {
		navigate("/account/" + accountId);
	};

	const handleDelete = async (accountId: string) => {
		console.log(accountId);
		const deleteAccountUrl = `/users/accounts`;
		const options: RequestInit = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				accountId: accountId,
			}),
		};
		const response = await fetch(BASE_URL + deleteAccountUrl, options);
		if (!response.ok) {
			alert(`Error fetching account status = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
		alert("account deleted");
		navigate("/accounts");
	};

	const accountRows = [...accounts].map((item, idx) => (
		<tr
			key={item.accountid}
			className={`border-t border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
			onClick={() => {
				accountClicked(item.accountid);
			}}
		>
			<td className="px-4 py-3 text-sm text-gray-800">{item.accountid}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.iban}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.institutionid}</td>
			<td className="px-4 py-3 text-sm text-gray-800">
				<button
					onClick={(e) => {
						e.stopPropagation();
						handleDelete(item.accountid);
					}}
					className="bg-red-600 text-white border border-red-700 rounded px-3 py-1 hover:bg-red-700 transition duration-200 cursor-pointer"
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
			<h1 className="text-2xl font-bold text-gray-900 mb-4">Accounts:</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse">
					<thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
						<tr>
							<th className="px-4 py-2 text-left">Account ID</th>
							<th className="px-4 py-2 text-left">IBAN</th>
							<th className="px-4 py-2 text-left">Institution ID</th>
							<th className="px-4 py-2 text-left">Action</th>
						</tr>
					</thead>
					<tbody>{accountRows}</tbody>
				</table>
			</div>
		</div>
	);
}

export default AccountList;
