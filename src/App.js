import logo from './logo.svg';
import './App.css';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Add from './pages/Add';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
	return (
		<Routes>
			<Route path='/' exact element={<Home />} />
			<Route path='/auth' exact element={<Auth />} />
			<Route path='/user/:userId' element={<Profile />} />
			<Route path='/add' exact element={<Add />} />
		</Routes>
	);
}

export default App;
