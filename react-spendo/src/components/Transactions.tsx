import { useState } from "react";
import type { Transaction } from "../pages/Dashboard";

interface TransactionsProp {
	transactions: Transaction[];
}

function Transactions({ transactions }: TransactionsProp) {
	const [sortKey, updateSortKey] = useState("date");

	const sortFunc = (ta: Transaction, tb: Transaction) => {
		const dateA = new Date(ta.date);
		const dateB = new Date(tb.date);
		if (sortKey === "date") {
			return dateB.getTime() - dateA.getTime();
		} else if (sortKey === "dateReverse") {
			return dateA.getTime() - dateB.getTime();
		} else if (sortKey === "amount") {
			return tb.amount - ta.amount;
		} else if (sortKey === "amountReverse") {
			return ta.amount - tb.amount;
		} else {
			return tb.amount - ta.amount;
		}
	};

	const transactionRows = [...transactions].sort(sortFunc).map((item) => {
		return (
			<tr key={item.transactionId} className={`border-t border-gray-200 bg-white hover:bg-blue-50`}>
				<td>{item.date}</td>
				<td>{item.description}</td>
				<td>{item.amount}</td>
				<td>{item.currency}</td>
			</tr>
		);
	});

	const sortByAmount = () => {
		if (sortKey !== "amount") {
			updateSortKey("amount");
			return;
		}
		updateSortKey("amountReverse");
	};

	const sortByDate = () => {
		if (sortKey !== "date") {
			updateSortKey("date");
			return;
		}
		updateSortKey("dateReverse");
	};

	return (
		<>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse border border-gray-200">
					<thead className="bg-gray-100">
						<tr>
							<th
								onClick={sortByDate}
								className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:text-blue-600"
							>
								Date
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
							<th
								onClick={sortByAmount}
								className="cursor-pointer px-4 py-3 text-right text-sm font-semibold text-gray-700 hover:text-blue-600"
							>
								Amount
							</th>
							<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Currency</th>
						</tr>
					</thead>
					<tbody>{transactionRows}</tbody>
				</table>
			</div>
		</>
	);
}

export default Transactions;
