import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import RequisitionList, { type Requisition } from "../components/RequisitionList";
import { BASE_URL } from "../main";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../components/UserContextProvider";

function RequisitionsPage() {
    const [requisitions, updateRequisitions] = useState<Requisition[]>([]);

    const navigate = useNavigate();
    const userContext = useUserContext();

    const fetchRequisitions = async () =>{
        const getRequisitionsUrl = `/requisitions`
		const options: RequestInit = {
			method: "GET",
			credentials: "include",
		};
		const response = await fetch(BASE_URL + getRequisitionsUrl, options);
		const data = await response.json();
		if (!response.ok) {
            alert(data.message);
			if (response.status === 401) {
                userContext.setUser(null);
				navigate("/login");
			}
			return;
		}
        const newRequisitions = [...data.results].map((item)=>{
            const requisition: Requisition = {
                requisitionId: item.id,
                created: new Date(item.created),
                status: item.status,
                institutionId: item.institution_id,
                agreementId: item.agreement,
                referenceId: item.reference,
                redirect: item.redirect,
                accounts: item.accounts,
            };
            return requisition;
        });
		updateRequisitions(newRequisitions);
    }

    const afterDeleteHandler = ()=>{
        fetchRequisitions();
    }

    useEffect(()=>{
        fetchRequisitions();
    }, []);

    return (
        <>
            <Nav />
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <RequisitionList requisitions={requisitions} afterDelete={afterDeleteHandler}/>
            </div>
        </>
    )
}

export default RequisitionsPage;
