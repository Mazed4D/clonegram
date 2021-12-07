import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import UserPosts from '../components/ui/UserPosts';

const Home = () => {
	const { user } = useAuth();

	return <UserPosts userId={user.uid} />;
};

export default Home;
