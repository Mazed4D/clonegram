import React from 'react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import placeholderImg from '../images/user.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const UserInfo = styled.div`
	display: flex;
	margin: 0 1rem;
	justify-content: space-between;
`;

const Profile = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	console.info(user);

	const logoutHandler = () => {
		logout();
		navigate('/auth');
	};

	return (
		<Layout>
			<UserInfo className='userInfo'>
				<img src={placeholderImg} alt='placeholder' />
				<h2>{user.displayName}</h2>
			</UserInfo>
			<div className='images'>
				<h3>images here</h3>
			</div>
			<button onClick={logoutHandler}>logout</button>
		</Layout>
	);
};

export default Profile;
