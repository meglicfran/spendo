import { useEffect, useRef, useState } from "react";
import Transactions from "../components/Transactions";
import TransactionSummary from "../components/TransacionSummary";
import TopTransactions from "../components/TopTransactions";

const BASE_URL = "http://localhost:3000";
const ACCOUNT_ID = "166ed110-b84e-4026-ab83-cc5e6112afda";

export interface Transaction {
	transactionId: string;
	date: string;
	description: string;
	amount: number;
	currency: string;
}

function Dashboard() {
	const dateFrom = useRef<HTMLInputElement>(null);
	const dateTo = useRef<HTMLInputElement>(null);

	const [transactions, updateTransactions] = useState<Transaction[]>([]);
	const [dateRange, updateDateRange] = useState<String[]>(["2025-07-01", "2025-07-31"]);

	const sendRequest = async () => {
		const date_from = dateRange[0];
		const date_to = dateRange[1];

		const accountTransactionsUrl = `/accounts/${ACCOUNT_ID}/transactions/?date_from=${date_from}&date_to=${date_to}`;
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
	}, [dateRange]);

	const refreshHandler = () => {
		if (dateFrom.current?.value !== "" && dateTo.current?.value !== "" && dateFrom.current && dateTo.current) {
			const from = new Date(dateFrom.current.value);
			const to = new Date(dateTo.current.value);
			if (to.getTime() - from.getTime() <= 0) {
				alert("Invalid date range!");
				return;
			}
			updateDateRange([dateFrom.current.value, dateTo.current.value]);
		}
		console.log(dateRange[0]);
		console.log(dateRange[1]);
	};

	return (
		<>
			<div className="date-container">
				<label>Date From:</label>
				<input type="date" id="dateFrom" name="dateFrom" ref={dateFrom} />

				<label>Date To:</label>
				<input type="date" id="dateTo" name="dateTo" ref={dateTo} />

				<button onClick={refreshHandler}>Refresh</button>
			</div>
			<div className="app-container">
				<TransactionSummary transactions={transactions} />
				<TopTransactions transactions={transactions} count={5} />
				<Transactions transactions={transactions} />
			</div>
		</>
	);
}

export default Dashboard;
