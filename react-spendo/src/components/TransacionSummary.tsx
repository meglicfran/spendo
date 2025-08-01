import type { Transaction } from "../App";

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
	);
}

export default TransactionSummary;
