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
		<div className="space-y-8">
			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Top {count} Incomes</h2>
				<ul className="space-y-2 list-disc list-inside text-gray-700">
					{incomes.map((t) => (
						<li key={t.transactionId} className="p-2 rounded bg-green-50 border border-green-200">
							<span className="font-mono text-sm text-gray-500 mr-2">[{t.date}]</span>
							<span>{t.description}</span>
							<span className="font-semibold text-green-700 ml-2">+${t.amount.toFixed(2)}</span>
						</li>
					))}
				</ul>
			</section>

			<section>
				<h2 className="text-xl font-semibold text-gray-800 mb-4">Top {count} Expenses</h2>
				<ul className="space-y-2 list-disc list-inside text-gray-700">
					{expenses.map((t) => (
						<li key={t.transactionId} className="p-2 rounded bg-red-50 border border-red-200">
							<span className="font-mono text-sm text-gray-500 mr-2">[{t.date}]</span>
							<span>{t.description}</span>
							<span className="font-semibold text-red-700 ml-2">-${Math.abs(t.amount).toFixed(2)}</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default TopTransactions;
