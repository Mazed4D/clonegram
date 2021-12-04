import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';
const TopNav = styled.div`
	position: fixed;
	top: 0px;
	width: 100vw;
	height: 4rem;
	font-family: 'Cedarville Cursive', cursive;
	color: white;
	overflow: hidden;
	background-color: #006891;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	margin: 0;
	h3 {
		font-size: 2rem;
		cursor: pointer;
		grid-column: 2/3;
		margin: 0 auto;
	}
	div {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`;

const StyledButton = styled.button`
	/* border-radius: 10px; */
	font-weight: 800;
	background-color: #000000;
	color: white;
	border: none;
	height: 100%;
	/* padding: 0.6rem; */
	/* margin: 1rem; */
	/* margin-right: 2rem; */
	transition: all 0.1s ease-in;
	&:active,
	:hover {
		background-color: black;
		color: white;
		transform: scale(1.1);
	}
`;

const TopNavigation = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const [loading, setLoading] = useState(false);

	const logoutHandler = () => {
		setLoading(true);
		setTimeout(() => {
			logout();
			setLoading(false);
			navigate('/auth');
		}, 600);
	};

	const titleHandler = () => {
		navigate('/');
	};

	return (
		<>
			{loading && <Loading text='Logging out...' />}

			<TopNav>
				<h3 onClick={titleHandler}>Cloneagram</h3>
				<div>
					{user && <StyledButton onClick={logoutHandler}>Log out</StyledButton>}
				</div>
			</TopNav>
		</>
	);
};

export default TopNavigation;
