import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard';
import Login from "./components/Login";
import Sidebar from './components/Sidebar';


function App() {
	return (
		<div className="App">
			<Router>
				<Sidebar>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</Sidebar>
			</Router>
		</div>
	);
}

export default App;

