import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import EmployeeLogin from "./components/Auth/EmployeeLogin";
import Sidebar from "./components/Menu/Sidebar";
import Vehicles from "./components/Vehicle/Vehicles";
import VehicleDetail from "./components/Vehicle/VehicleDetail";
import OfferList from "./components/Offer/OfferList";
import CreatePurchaseRequest from "./components/PurchaseRequest/CreatePurchaseRequest";
import { UserContext } from "./providers/UserProvider";
import OfferSuccess from "./components/Offer/OfferSuccess";
import VehicleRequest from "./components/Vehicle/VehicleRequest";
import PurchaseRequest from "./components/PurchaseRequest/PurchaseRequest"
import PurchaseRequestDetail from "./components/PurchaseRequest/PurchaseRequestDetail"
import Http404 from "./components/HttpError/Http404"
import Http500 from "./components/HttpError/Http500"
import PurchaseOrderDetail from "./components/PurchaseOrder/PurchaseOrderDetail";
import PurchaseOrder from "./components/PurchaseOrder/PurchaseOrder";

function App() {
	const { user } = useContext(UserContext)
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
						<Route path="/login/employee" element={<EmployeeLogin />} />
						<Route path="/vehicles" element={<Vehicles />} />
						<Route path="/vehicles/detail/:id" element={<VehicleDetail />} />
						<Route path="/offers" element={<OfferList />} />
						<Route path="/offers/detail/:id" element={<CreatePurchaseRequest />} />
						<Route path="/offers/purchaserequest/create" element={<CreatePurchaseRequest />} />
						<Route path="/vehicles/:id" element={<VehicleDetail />} />
						<Route path="/vehicles/:id/request" element={<VehicleRequest />} />
						<Route path="/invoice/success" element={<OfferSuccess />} />
						<Route path="/purchase-request" element={<PurchaseRequest />} />
						<Route path="/purchase-request/:id" element={<PurchaseRequestDetail />} />
						<Route path="/404" element={<Http404 />} />
						<Route path="/500" element={<Http500 />} />
						<Route path="/purchase-request/:id" element={<PurchaseRequestDetail />} />
						<Route path="/purchase-order" element={<PurchaseOrder />} />
						<Route path="/purchase-order/:id" element={<PurchaseOrderDetail />} />
					</Routes>
				</Sidebar>
			</Router>
		</div>
	);
}

export default App;
