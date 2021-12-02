import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Button from './Button';

const TopNav = styled.div`
	position: fixed;
	top: 0px;
	width: 100vw;
	height: 4rem;
	font-family: 'Cedarville Cursive', cursive;
	font-size: 2rem;
	color: white;
	overflow: hidden;
	background-color: #006891;
	display: flex;
	justify-content: center;
	align-items: center;
	h3 {
		cursor: pointer;
	}
`;

const TopNavigation = () => {
	const navigate = useNavigate();

	const titleHandler = () => {
		navigate('/');
	};

	return (
		<TopNav>
			<h3 onClick={titleHandler}>Cloneagram</h3>
		</TopNav>
	);
};

export default TopNavigation;
