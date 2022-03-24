import * as React from 'react';
import './App.css';
import Example from './components/Example';
import Vehicles from './components/Vehicle/Vehicles';

function App() {
	return (
		<div className="App">
			<Router>
				<Sidebar>
					<Routes>
						<Route path="/" element={auth ? <Dashboard /> : <Login />} />
						<Route path="/login" element={<Login />} />
					</Routes>
					<div>
						TEMP:
						<button onClick={() => login("test")}>setCookie</button>
						<button onClick={() => logout()}>removeCookie</button>
					</div>
				</Sidebar>
			</Router>
		</div>

	);
}

export default App;

