import { useEffect, useState } from "react";
import Transactions from "./components/Transactions";
import TransactionSummary from "./components/TransacionSummary";

const BASE_URL = "http://localhost:3000";
const ACCOUNT_ID = "166ed110-b84e-4026-ab83-cc5e6112afda";

export interface Transaction {
	transactionId: string;
	date: string;
	description: string;
	amount: number;
	currency: string;
}

function App() {
	const [transactions, updateTransactions] = useState<Transaction[]>([]);
	const sendRequest = async () => {
		const date_from = "2025-07-01";
		const date_to = "2025-07-31";

		const accountTransactionsUrl = `/api/v2/accounts/${ACCOUNT_ID}/transactions/?date_from=${date_from}&date_to=${date_to}`;
		const options: RequestInit = {
			method: "GET",
		};
		const response = await fetch(BASE_URL + accountTransactionsUrl, options);
		if (!response.ok) {
			console.log(`Error fetching account status = ${response.status}`);
			return;
		}

		const data = await response.json();
		console.log(data.transactions.booked);
		const newTransactions = (data.transactions.booked as Array<any>).map((value) => {
			const transaction: Transaction = {
				transactionId: value.transactionId,
				date: value.bookingDate,
				description: value.remittanceInformationUnstructured,
				amount: Number(value.transactionAmount.amount),
				currency: value.transactionAmount.currency,
			};
			return transaction;
		});
		updateTransactions(newTransactions);
	};

	useEffect(() => {
		sendRequest();
	}, []);

	return (
		<>
			<button onClick={sendRequest}>Refresh</button>
			<div className="app-container">
				<TransactionSummary transactions={transactions} />
				<Transactions transactions={transactions} />
			</div>
		</>
	);
}

export default App;
