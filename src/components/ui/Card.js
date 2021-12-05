import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import placeholder from '../../images/placeholder.jpg';
import Button from './Button';
import { database } from '../../firebase';
import { update, remove, onValue, ref as dbRef, get } from 'firebase/database';
import { useNavigate } from 'react-router';

const CardDiv = styled.div`
	background-color: #0096ce;
	color: white;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	height: fit-content;
	.top {
		max-height: 3.5rem;
		padding: 0.1rem 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		h3 {
			margin: 0 1rem;
		}
		img {
			border: 3px solid #006891;
			border-radius: 50%;
			width: 3rem;
			height: 3rem;
			object-fit: cover;
		}
	}
	.bottom {
		height: 3rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	Button {
		color: white;
		&:hover,
		:active {
			transform: scale(1.1);
			color: lightpink;
		}
		&:active {
			color: red;
		}
	}
`;

const Img = styled.img`
	width: 100%;
	height: fit-content;
`;

const Card = ({
	user,
	image = placeholder,
	title = 'Placeholder',
	postName = '',
}) => {
	const [userName, setUserName] = useState('user');
	const [likeNum, setLikeNum] = useState(0);
	const likesRef = dbRef(database, `/posts/${postName}/likes`);
	const navigate = useNavigate();

	const fetchLikes = async () => {
		onValue(likesRef, (snapshot) => {
			const data = snapshot.val();
			if (data !== null) {
				setLikeNum(Object.keys(data).length);
			} else {
				setLikeNum(0);
			}
			console.log(data);
		});
	};

	const fetchUser = async () => {
		const path = `/users/${user}`;
		const ref = dbRef(database, path);
		get(ref).then((snapshot) => {
			if (snapshot.val() !== null) {
				setUserName(snapshot.val());
			}
		});
	};

	useEffect(() => {
		fetchLikes();
		fetchUser();
	}, []);

	const likeFn = async () => {
		const path = `/posts/${postName}/likes`;
		const ref = dbRef(database, path);
		const like = () => {
			get(ref).then((snapshot) => {
				const res = snapshot.val();
				console.log(res);
				if (res === null || res[user] === false) {
					const data = {
						[user]: true,
					};

					update(ref, data)
						.then((res) => {
							console.info(res);
						})
						.catch((err) => {
							console.info(err);
						});
					return;
				} else {
					remove(dbRef(database, `/posts/${postName}/likes/${user}`));
					return;
				}
			});
		};
		like();
		fetchLikes();
	};

	const navToUser = () => {
		navigate(`/user/${user}`);
	};

	return (
		<CardDiv>
			<div className='top'>
				<img src={placeholder} alt='user' onClick={navToUser} />
				<h3>{userName}</h3>
				<p>follow</p>
			</div>
			<Img src={image} alt={title} />
			<div className='bottom'>
				<p>{likeNum} likes</p>
				<p>{title}</p>
				<Button likeFn={likeFn}>
					<FontAwesomeIcon icon={faHeart} className='icon' />
				</Button>
			</div>
		</CardDiv>
	);
};

export default Card;
