import React from 'react';
import { useAuth } from '../context/AuthContext';
import placeholderImg from '../images/user.png';
import styled from 'styled-components';
import ImagesComponent from '../components/ui/ImagesComponent';

const UserInfo = styled.div`
	display: flex;
	margin: 0 1rem;
	justify-content: space-between;
`;

const Profile = () => {
	const { user } = useAuth();

	return (
		<div>
			<UserInfo className='userInfo'>
				<img src={placeholderImg} alt='placeholder' />
				<h2>{user.displayName}</h2>
				<h3>0 Followers</h3>
				<h3>0 Followings</h3>
			</UserInfo>
			<ImagesComponent userId={user.uid} />
		</div>
	);
};

export default Profile;
