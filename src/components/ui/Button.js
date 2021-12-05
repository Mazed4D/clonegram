import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	overflow: hidden;
	background-color: transparent;
	border-color: transparent;
	color: black;
	margin: 8px 0;
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

const Button = ({ navFn, children, navigateTo, disabled }) => {
	const onClick = () => {
		if (navFn) {
			navFn(navigateTo);
		}
	};

	return (
		<StyledButton onClick={onClick} disabled={disabled}>
			{children}
		</StyledButton>
	);
};

export default Button;
