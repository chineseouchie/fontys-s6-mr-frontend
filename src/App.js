import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './App.css';
import Vehicles from "./components/Vehicle/Vehicles";
import VehicleDetail from "./components/Vehicle/VehicleDetail";


function App() {
	return (
		<div className="App">
			<Router>
					<Routes>
						<Route path="/" element={<Vehicles />} />
						<Route path="/detail/:id" element={<VehicleDetail />} />
					</Routes>
			</Router>
		</div>
	);
}

export default App;
