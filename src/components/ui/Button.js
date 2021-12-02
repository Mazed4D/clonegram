import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const StyledButton = styled.button`
	overflow: hidden;
	background-color: transparent;
	border-color: transparent;
	color: black;
	margin: 8px;
	padding: 0;
	font-size: 2rem;
	min-width: fit-content;
	transition: all 100ms ease-in;
	&:hover,
	:active {
		color: white;
		transform-origin: center;
		transform: scale(1.2);
	}
	&:active {
		color: #0096ce;
	}
	&:disabled {
		display: none;
	}
`;

const Button = ({ children, navigateTo, disabled }) => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate(navigateTo);
	};

	return (
		<StyledButton onClick={onClick} disabled={disabled}>
			{children}
		</StyledButton>
	);
};

export default Button;
