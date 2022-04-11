import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import Sidebar from "./components/Menu/Sidebar";
import Vehicles from "./components/Vehicle/Vehicles";
import VehicleDetail from "./components/Vehicle/VehicleDetail";
import { UserContext } from "./providers/UserProvider";
import OfferSuccess from "./components/Offer/OfferSuccess";
import VehicleRequest from "./components/Vehicle/VehicleRequest";


function App() {
	const { user, login, logout } = useContext(UserContext)
	const [auth, setAuth] = useState(false)

	useEffect(() => {
		if (user.jwt) {
			setAuth(true)
		} else {
			setAuth(false)
		}

	}, [user.jwt])

	return (
		<div className="App">
			<Router>
				<Sidebar>
					<Routes>
						<Route path="/" element={auth ? <Dashboard /> : <Login />} />
						<Route path="/login" element={<Login />} />
						<Route path="/vehicles" element={<Vehicles />} />
						<Route path="/vehicles/:id" element={<VehicleDetail />} />
						<Route path="/vehicles/:id/request" element={<VehicleRequest />} />
						<Route path="/invoice/success" element={<OfferSuccess />} />
					</Routes>
					<div>
						TEMPORARY:
						<button onClick={() => login("test")}>setCookie</button>
						<button onClick={() => logout()}>removeCookie</button>
					</div>
				</Sidebar>
			</Router>
		</div>
	);
}

export default App;
