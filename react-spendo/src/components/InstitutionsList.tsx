import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../main";
import { useUserContext } from "./UserContextProvider";

interface Prop {
	institutions: any[];
}

function InstitutionsList({ institutions }: Prop) {
	const handleClick = async (institution: any) => {
		console.log(institution);
		const createRequisitionUrl = "/requisitions";
		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				institution_id: institution.id,
				redirect: "https://spendo-delta.vercel.app/added/",
				account_selection: false,
				redirect_immediate: false,
			}),
		};
		const response = await fetch(BASE_URL + createRequisitionUrl, options);
		if (!response.ok) {
			console.log(`Error fetching account status = ${response.status}`);
			if (response.status === 401) {
				useUserContext().setUser(null);
				useNavigate()("/login");
			}
			return;
		}
		const data = await response.json();
		window.location.href = data.link;
	};

	const institutionsList = [...institutions].map((item, idx) => (
		<li key={idx}>
			<button
				onClick={() => handleClick(item)}
				className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				<img src={item.logo} alt={`${item.name} logo`} className="w-12 h-12 object-contain" />
				<span className="text-lg font-medium text-gray-700 text-left">{item.name}</span>
			</button>
		</li>
	));

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
			<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{institutionsList}</ul>
		</div>
	);
}

export default InstitutionsList;
