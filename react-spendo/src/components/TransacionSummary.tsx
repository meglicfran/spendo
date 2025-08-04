import type { Transaction } from "../pages/Dashboard";

interface SummaryProp {
	transactions: Transaction[];
}

function TransactionSummary({ transactions }: SummaryProp) {
	const getIncome = (digits: number) => {
		const income = transactions.reduce((sum, t) => {
			return t.amount > 0 ? sum + t.amount : sum;
		}, 0);
		return Number(income.toFixed(digits));
	};

	const getExpenses = (digits: number) => {
		const expenses = transactions.reduce((sum, t) => {
			return t.amount < 0 ? sum + t.amount : sum;
		}, 0);
		return Number(expenses.toFixed(digits));
	};

	const getCurrency = () => {
		return transactions.length > 0 ? transactions[0].currency : "EUR";
	};

	const getNet = (digits: number) => {
		const income = getIncome(digits);
		const expenses = getExpenses(digits);
		return (income + expenses).toFixed(digits);
	};

	return (
		<div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
			<h1 className="text-2xl font-bold text-gray-900 mb-4">Transaction Summary:</h1>
			<div className="space-y-3 text-gray-700 text-lg">
				<h2 className="flex justify-between">
					<span>Income:</span>
					<span className="font-semibold text-green-600">
						{getIncome(2)} {getCurrency()}
					</span>
				</h2>
				<h2 className="flex justify-between">
					<span>Expenses:</span>
					<span className="font-semibold text-red-600">
						{getExpenses(2)} {getCurrency()}
					</span>
				</h2>
				<h2 className="flex justify-between border-t pt-3 mt-3 font-semibold text-gray-900 text-xl">
					<span>Net:</span>
					<span>
						{getNet(2)} {getCurrency()}
					</span>
				</h2>
			</div>
		</div>
	);
}
/*
<div>
			<h1>Transaction Summary:</h1>
			<h2>
				Income: {getIncome(2)} {getCurrency()}
			</h2>
			<h2>
				Expenses: {getExpenses(2)} {getCurrency()}
			</h2>
			<h2>
				Net: {getNet(2)} {getCurrency()}
			</h2>
		</div>
*/
export default TransactionSummary;
