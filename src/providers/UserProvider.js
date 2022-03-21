import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext({ auth: false })

export default function UserProvider({ children }) {
	const [user, setUser] = useState({ jwt: null })
	const [cookies, setCookie, removeCookie] = useCookies(["mr_jwt"]);
	useEffect(() => {
		if (cookies?.mr_jwt) {
			setUser(() => ({
				jwt: cookies?.mr_jwt
			}))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const login = (jwt) => {
		setCookie("mr_jwt", jwt)
		setUser(() => ({
			jwt: jwt
		}))
	}

	const logout = () => {
		removeCookie("mr_jwt")
		setUser(() => ({
			jwt: null
		}));
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
