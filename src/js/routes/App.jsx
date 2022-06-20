import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavCom from '../components/navcom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import Create from '../pages/create';
import Edit from '../pages/edit';

function App() {
	return (
		<>
			<BrowserRouter>
				<NavCom />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/create-todo" element={<Create />} />
					<Route path="/edit-todo/:id" element={<Edit />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
