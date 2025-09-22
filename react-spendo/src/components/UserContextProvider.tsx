import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { BASE_URL } from "../main";

export interface User {
	username: string;
	id: number;
}

export interface UserContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
	const user = useContext(UserContext);

	if (user === undefined) {
		throw new Error("useUserContext must be used inside UserContextProvider");
	}
	return user;
};

export function UserContextProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	const userContextValue = { user, setUser };

	useEffect(() => {
		const loginUrl = `/users/login`;
		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		};

		fetch(BASE_URL + loginUrl, options).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setUser({
						username: data.username,
						id: data.id,
					});
				});
			} else {
				setUser(null);
			}
		});
	}, []);

	return <UserContext.Provider value={userContextValue}> {children} </UserContext.Provider>;
}
