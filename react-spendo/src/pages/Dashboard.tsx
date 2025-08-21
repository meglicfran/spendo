import { useEffect, useRef, useState } from "react";
import Transactions from "../components/Transactions";
import TransactionSummary from "../components/TransacionSummary";
import TopTransactions from "../components/TopTransactions";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { BASE_URL } from "../main";

export interface Transaction {
	transactionId: string;
	date: string;
	description: string;
	amount: number;
	currency: string;
}

function Dashboard() {
	const params = useParams();

	const dateFrom = useRef<HTMLInputElement>(null);
	const dateTo = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState(false);
	const [transactions, updateTransactions] = useState<Transaction[]>([]);
	const [dateRange, updateDateRange] = useState<String[]>(["2025-07-01", "2025-07-31"]);

	const sendRequest = async () => {
		setLoading(true);
		const date_from = dateRange[0];
		const date_to = dateRange[1];

		const accountTransactionsUrl = `/accounts/${params.accountId}/transactions/?date_from=${date_from}&date_to=${date_to}`;
		const options: RequestInit = {
			method: "GET",
			credentials: "include",
		};
		try {
			const response = await fetch(BASE_URL + accountTransactionsUrl, options);
			const data = await response.json();
			if (!response.ok) {
				alert(data.summary);
				return;
			}

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
		} finally {
			setLoading(false);
		}
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
	};

	return (
		<>
			<Nav />
			<div className="space-y-10 p-6 max-w-7xl mx-auto">
				{/* Date Range Selector */}
				<div className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-lg shadow border border-gray-200">
					<div className="flex flex-col">
						<label htmlFor="dateFrom" className="text-sm font-medium text-gray-700">
							Date From:
						</label>
						<input
							type="date"
							id="dateFrom"
							name="dateFrom"
							ref={dateFrom}
							className="mt-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="dateTo" className="text-sm font-medium text-gray-700">
							Date To:
						</label>
						<input
							type="date"
							id="dateTo"
							name="dateTo"
							ref={dateTo}
							className="mt-1 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<button
						onClick={refreshHandler}
						disabled={loading}
						className={`h-10 px-5 mt-5 text-sm font-medium rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
						}`}
					>
						{loading ? "Loading..." : "Refresh"}
					</button>
				</div>

				{/* Dashboard Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-1">
						<TransactionSummary transactions={transactions} />
					</div>
					<div className="lg:col-span-2 space-y-8">
						<TopTransactions transactions={transactions} count={5} />
						<Transactions transactions={transactions} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
