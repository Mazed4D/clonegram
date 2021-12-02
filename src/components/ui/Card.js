import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import placeholder from '../../images/placeholder.jpg';
import Button from './Button';
import userImage from '../../images/user.png';

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
		justify-content: flex-start;
		align-items: center;
		h3 {
			margin: 0 1rem;
		}
		img {
			border: 3px solid #006891;
			border-radius: 50%;
			width: 3rem;
		}
	}
	.bottom {
		max-height: 3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
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

const Card = ({ user, userImg, likes = 0, description = 'placeholder' }) => {
	return (
		<CardDiv>
			<div className='top'>
				<img src={userImage} alt='user' />
				<h3>user</h3>
				<p>follow</p>
			</div>
			<Img src={placeholder} alt='' />
			<div className='bottom'>
				<p>{likes} likes</p>
				<p>{description}</p>
				<Button>
					<FontAwesomeIcon icon={faHeart} className='icon' />
				</Button>
			</div>
		</CardDiv>
	);
};

export default Card;
