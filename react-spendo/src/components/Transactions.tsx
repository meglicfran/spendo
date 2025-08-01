import type { Transaction } from "../App";

interface TransactionsProp {
	transactions: Transaction[];
}

function Transactions({ transactions }: TransactionsProp) {
	const transactionRows = transactions.map((item) => {
		return (
			<tr key={item.transactionId}>
				<td>{item.date}</td>
				<td>{item.description}</td>
				<td>{item.amount}</td>
				<td>{item.currency}</td>
			</tr>
		);
	});

	return (
		<>
			<div className="transactions-container">
				<table className="transactions">
					<thead>
						<tr>
							<th>Date</th>
							<th>Description</th>
							<th>Amount</th>
							<th>Currency</th>
						</tr>
					</thead>
					<tbody>{transactionRows}</tbody>
				</table>
			</div>
		</>
	);
}

export default Transactions;
