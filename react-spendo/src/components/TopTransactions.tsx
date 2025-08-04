import type { Transaction } from "../pages/Dashboard";

interface TransactionsProp {
	transactions: Transaction[];
	count: number;
}

function TopTransactions({ transactions, count }: TransactionsProp) {
	const incomes = [...transactions]
		.filter((t) => t.amount > 0)
		.sort((a, b) => b.amount - a.amount)
		.slice(0, count);

	const expenses = [...transactions]
		.filter((t) => t.amount < 0)
		.sort((a, b) => a.amount - b.amount)
		.slice(0, count);

	return (
		<div>
			<h2>Top {count} Incomes</h2>
			<ul>
				{incomes.map((t) => (
					<li key={t.transactionId}>
						[{t.date}] {t.description}: +${t.amount.toFixed(2)}
					</li>
				))}
			</ul>

			<h2>Top {count} Expenses</h2>
			<ul>
				{expenses.map((t) => (
					<li key={t.transactionId}>
						[{t.date}] {t.description}: -${Math.abs(t.amount).toFixed(2)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TopTransactions;
