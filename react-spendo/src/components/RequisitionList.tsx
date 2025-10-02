import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";
import { useUserContext } from "./UserContextProvider";

export interface Requisition {
	requisitionId: string;
	created: Date;
    redirect: string;
	status: string;
    institutionId: string;
    agreementId: string;
    referenceId: string;
    accounts: string[];
}

interface RequisitionsProp{
	requisitions: Requisition[];
    afterDelete: ()=>void;
}

function RequisitionList({requisitions, afterDelete} : RequisitionsProp){
    const navigate = useNavigate();
    const userContext = useUserContext();

    const handleDelete = async (requisitionId: string) => {
		const deleteRequisitionUrl = `/requisitions/${requisitionId}`;
		const options: RequestInit = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		};
		const response = await fetch(BASE_URL + deleteRequisitionUrl, options);
		if (!response.ok) {
			alert(`Error fetching account status = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
		alert(`Requisition ${requisitionId} deleted`);
		afterDelete();
    }
    const requisitionRows = [...requisitions].map((item, idx) => (
		<tr
			key={item.requisitionId}
			className={`border-t border-gray-200 ${
				idx % 2 === 0 ? "bg-white" : "bg-gray-50"
			} hover:bg-blue-50`}
		>
			<td className="px-4 py-3 text-sm text-gray-800">{item.requisitionId}</td>
			<td className="px-4 py-3 text-sm text-gray-800">
				{new Date(item.created).toLocaleString("hr-HR")}
			</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.institutionId}</td>
			{/*<td className="px-4 py-3 text-sm text-gray-800">{item.status}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.agreementId}</td>
			<td className="px-4 py-3 text-sm text-gray-800">{item.referenceId}</td>*/}
			<td className="px-4 py-3 text-sm text-gray-800">
				{item.accounts.length > 0 ? item.accounts.join(", ") : "-"}
			</td>
			<td className="px-4 py-3 text-sm text-gray-800">
				<button
					onClick={(e) => {
						e.stopPropagation();
                        handleDelete(item.requisitionId)
					}}
					className="bg-red-600 text-white border border-red-700 rounded px-3 py-1 hover:bg-red-700 transition duration-200 cursor-pointer"
				>
					Delete
				</button>
			</td>
		</tr>
	));

	return (
		<div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
			<h1 className="text-2xl font-bold text-gray-900 mb-4">Requisitions:</h1>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse">
					<thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
						<tr>
							<th className="px-4 py-2 text-left">Requisition ID</th>
							<th className="px-4 py-2 text-left">Created</th>
							<th className="px-4 py-2 text-left">Institution ID</th>
							{/*<th className="px-4 py-2 text-left">Status</th>
							<th className="px-4 py-2 text-left">Agreement ID</th>
							<th className="px-4 py-2 text-left">Reference ID</th>*/}
							<th className="px-4 py-2 text-left">Accounts</th>
							<th className="px-4 py-2 text-left">Action</th>
						</tr>
					</thead>
					<tbody>{requisitionRows}</tbody>
				</table>
			</div>
		</div>
	);
}
export default RequisitionList;