import React, { useEffect, useState } from 'react';
import placeholderImg from '../images/user.png';
import styled from 'styled-components';
import ImagesComponent from '../components/ui/ImagesComponent';
import { useParams } from 'react-router';
import { database } from '../firebase';
import { ref as dbRef, get } from 'firebase/database';

const UserInfo = styled.div`
	display: flex;
	margin: 1rem 0.3rem;
	height: 5rem;
	justify-content: space-between;
	align-items: center;
`;

const UserImage = styled.img`
	border-radius: 50%;
	height: 100%;
	width: auto;
	object-fit: cover;
	border: 5px solid #006891;
`;

const UserName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	height: 100%;
	h3,
	p {
		margin: 0;
	}
`;

const UserFollows = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	flex-direction: column;
	height: 100%;
	p {
		margin: 0;
		padding: 0;
	}
`;

const Profile = () => {
	const params = useParams();
	const [userName, setUserName] = useState('User');

	const fetchUser = async () => {
		const path = `/users/${params.userId}`;
		const ref = dbRef(database, path);
		get(ref).then((snapshot) => {
			if (snapshot.val() !== null) {
				setUserName(snapshot.val());
			}
		});
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const changeProfilePhoto = () => {};

	return (
		<div>
			<UserInfo className='userInfo'>
				<UserImage
					src={placeholderImg}
					alt='placeholder'
					onClick={changeProfilePhoto}
				/>
				<UserName>
					<h3>{userName}</h3>
					<p>{params.userId}</p>
				</UserName>
				<UserFollows>
					<p>0</p>
					<p>Followers</p>
					<p>0</p>
					<p>Followings</p>
				</UserFollows>
			</UserInfo>
			<ImagesComponent userId={params.userId} />
		</div>
	);
};

export default Profile;
