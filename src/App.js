import './App.css';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Add from './pages/Add';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';

function App() {
	const { user } = useAuth();

	return (
		<Routes>
			<Route path='*' element={<Layout />}>
				{user ? (
					<>
						<Route path='' exact element={<Home />} />
						<Route path='user/:userId' element={<Profile />} />
						<Route path='add' exact element={<Add />} />
					</>
				) : (
					<>
						<Route path='auth' exact element={<Auth />} />
						<Route path='*' element={<Auth />} />
					</>
				)}
			</Route>
		</Routes>
	);
}

export default App;
