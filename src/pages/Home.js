import React from 'react';
import Card from '../components/ui/Card';
// import { useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router';

const Home = () => {
	// const { user } = useAuth();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (!user) {
	// 			navigate('/auth');
	// 		}
	// 	}, 500);
	// }, []);

	return (
		<>
			<Card />
			<Card />
		</>
	);
};

export default Home;
