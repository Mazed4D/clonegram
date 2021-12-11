import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import FollowedPosts from '../components/ui/FollowedPosts';

const Home = () => {
	const { user } = useAuth();

	return <FollowedPosts userId={user.uid} />;
};

export default Home;
