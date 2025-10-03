import { type PropsWithChildren } from "react";
import { useUserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";
type ProtectedRouteProps = PropsWithChildren;

export  function ProtectedRoute({children} : ProtectedRouteProps){
    const userContext = useUserContext();

    if (userContext.user === null) {
        return <Navigate to="/login" replace/>;
    }
    return children;
}

export function AdminProtectedRoute({children} : PropsWithChildren){
    const userContext = useUserContext();

    if(userContext.user ===null) {
        return <Navigate to="/login" replace />
    }else if(!userContext.user.isAdmin){
        alert("You are not admin");
    }
    return children;
}