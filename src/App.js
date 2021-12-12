import './App.css';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Add from './pages/Add';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { useAuth } from './context/AuthContext';
import Posts from './pages/Posts';
import Layout from './components/layout/Layout';
import Public from './pages/Public';

function App() {
	const { user } = useAuth();

	return (
		<Routes>
			<Route path='*' element={<Layout />}>
				{user ? (
					<>
						<Route path='' exact element={<Home />} />
						<Route path='public' element={<Public />} />
						<Route path='user/:userId' element={<Profile />} />
						<Route path='add' exact element={<Add />} />
						<Route path='posts/:userId' element={<Posts />} />
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
