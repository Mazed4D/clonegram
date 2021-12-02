import React from 'react';
import { Outlet } from 'react-router';
import styled from 'styled-components';
import BottomNavigation from '../ui/BottomNavigation';
import TopNavigation from '../ui/TopNavigation';

const LayoutDiv = styled.div`
	display: grid;
	font-family: 'PT Sans Narrow', sans-serif;
	outline: none;
	padding: 0;
	max-width: 100vw;
	box-sizing: border -box;
	background-color: #0096ce;
	min-height: 100vh;
	grid-template-rows: 4rem auto 4rem;
	.main {
		grid-row: 2/2;
		display: block;
		@media (min-width: 768px) {
			width: 40rem;
			margin: 0 auto;
		}
	}
`;

const Layout = ({ children }) => {
	return (
		<LayoutDiv>
			<TopNavigation />
			<div className='main'>
				<Outlet />
			</div>
			<BottomNavigation />
		</LayoutDiv>
	);
};

export default Layout;
