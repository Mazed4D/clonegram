import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const Home = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate('/auth');
		}
	}, []);

	return (
		<Layout>
			<Card />
			<Card />
		</Layout>
	);
};

export default Home;
