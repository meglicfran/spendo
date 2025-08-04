interface AccountsProp {
	accounts: {
		accountid: string;
		iban: string;
		institutionid: string;
	}[];
}

function AccountList({ accounts }: AccountsProp) {
	const accountRows = [...accounts].map((item, idx) => (
		<tr
			key={item.accountid}
			className={`border-t border-gray-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
		>
			<td className="px-4 py-3 text-sm text-gray-800">{item.accountid}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.iban}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.institutionid}</td>
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
						</tr>
					</thead>
					<tbody>{accountRows}</tbody>
				</table>
			</div>
		</div>
	);
}

export default AccountList;
