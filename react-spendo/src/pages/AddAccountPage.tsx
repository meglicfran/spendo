import { useEffect, useState } from "react";
import InstitutionsList from "../components/InstitutionsList";
import Nav from "../components/Nav";
import { BASE_URL } from "../main";
import { useUserContext } from "../components/UserContextProvider";
import { useNavigate } from "react-router-dom";

function AddAccountPage() {
	const [institutions, updateInstitutions] = useState([]);

	const navigate = useNavigate();
	const userContext = useUserContext();

	const fetchInstitutions = async () => {
		const getInstitutionsUrl = "/institutions/?country=HR";
		const options: RequestInit = {
			method: "GET",
			credentials: "include",
		};
		const response = await fetch(BASE_URL + getInstitutionsUrl, options);
		if (!response.ok) {
			console.log(`Error fetching account status = ${response.status}`);
			if (response.status === 401) {
				userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
		const data = await response.json();
		console.log(data);
		updateInstitutions(data);
	};

	useEffect(() => {
		fetchInstitutions();
	}, []);

	return (
		<>
			<Nav />
			<div className="max-w-7xl mx-auto p-6 space-y-6">
				<h1 className="text-3xl font-bold text-gray-800 mb-10">Choose a Bank:</h1>
				<div className="max-w-6xl mx-auto">
					<InstitutionsList institutions={institutions} />
				</div>
			</div>
		</>
	);
}

export default AddAccountPage;
