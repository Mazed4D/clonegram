import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import placeholder from '../../images/placeholder.jpg';
import Button from './Button';
import { database } from '../../firebase';
import { update, remove, onValue, ref as dbRef, get } from 'firebase/database';
import { useNavigate } from 'react-router';
import followFunc from '../../api/followFunc';
import { useAuth } from '../../context/AuthContext';

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
			cursor: pointer;
		}
		img {
			border: 3px solid #006891;
			border-radius: 50%;
			width: 3rem;
			height: 3rem;
			object-fit: cover;
			cursor: pointer;
		}
	}
	.bottom {
		height: 3rem;
		display: flex;
		justify-content: space-around;
		align-items: center;
		button {
			color: white;
			cursor: pointer;

			&:hover,
			:active {
				transform: scale(1.1);
				color: lightpink;
			}
			&:active {
				color: red;
			}
		}
	}
`;

const FollowBtn = styled.button`
	font-weight: 600;
	width: 6rem;
	cursor: pointer;
	background-color: #006891;
	color: white;
	border-radius: 10px;
	border: none;
	padding: 1rem;
	transition: all 0.1s ease-in;
	&:hover,
	:active {
		transform: scale(0.9);
	}
	&:active {
		color: #006891;
		background-color: white;
	}
`;

const Img = styled.img`
	width: 100%;
	height: fit-content;
`;

const Card = ({ user, image, title = 'Placeholder', postName = '' }) => {
	const { user: currentUser } = useAuth();
	const [userName, setUserName] = useState('user');
	const [likeNum, setLikeNum] = useState(0);
	const [followState, setFollowState] = useState(false);
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

	const fetchFollowState = async () => {
		const path = `/follows/${currentUser.uid}/${user}`;
		const ref = dbRef(database, path);
		await get(ref).then((snapshot) => {
			if (snapshot.val() === null) {
				setFollowState(false);
			} else {
				setFollowState(true);
			}
		});
	};

	useEffect(() => {
		fetchLikes();
		fetchUser();
		fetchFollowState();
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

	const followFn = () => {
		followFunc(currentUser.uid, user);
		setFollowState((state) => {
			return !state;
		});
	};

	return (
		<CardDiv>
			<div className='top'>
				<img src={placeholder} alt='user' onClick={navToUser} />
				<h3 onClick={navToUser}>{userName}</h3>
				{user !== currentUser.uid ? (
					<FollowBtn onClick={followFn}>
						{followState ? 'Unfollow' : 'Follow'}
					</FollowBtn>
				) : (
					<div></div>
				)}
			</div>
			<Img src={image} alt={title} />
			<div className='bottom'>
				<p>{likeNum} likes</p>
				<p>{title}</p>
				<Button likeFn={likeFn} className='likeBtn'>
					<FontAwesomeIcon icon={faHeart} className='icon' />
				</Button>
			</div>
		</CardDiv>
	);
};

export default Card;
