import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	z-index: 100;
	height: 100%;
	width: 100%;
	color: white;
	background-color: rgba(0, 0, 0, 0.6);
	animation: 0.5s ease-in-out 1s infinite alternate both running pulse;
	@keyframes pulse {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.5);
		}
	}
`;

const Loading = () => {
	return (
		<Overlay>
			<h2>Loading...</h2>
		</Overlay>
	);
};

export default Loading;
