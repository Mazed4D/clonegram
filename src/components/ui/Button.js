import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
	overflow: hidden;
	background-color: transparent;
	border-color: transparent;
	cursor: pointer;
	color: black;
	margin: 8px 0;
	padding: 0;
	font-size: 2rem;
	min-width: fit-content;
	transition: all 100ms ease-in;

	&:hover,
	:active {
		color: white;
		color: ${({ likeBtn }) => likeBtn && 'lightpink'};
		transform-origin: center;
		transform: scale(1.2);
	}
	&:active {
		color: #0096ce;
		color: ${({ likeBtn }) => likeBtn && 'red'};
		color: ${({ liked }) => liked && 'white'};
	}
	&:disabled {
		display: none;
	}

	color: ${({ likeBtn }) => likeBtn && 'white'};
	color: ${({ liked }) => liked && 'red'};
	/* &:hover,
	:active {
		color: lightpink;
	}
	&:active {
		color: red;
	} */
`;

const Button = ({
	navFn,
	children,
	navigateTo,
	disabled,
	likeFn,
	likeBtn = false,
	liked = false,
}) => {
	const onClick = () => {
		if (navFn) {
			navFn(navigateTo);
		} else {
			likeFn();
		}
	};

	return (
		<StyledButton
			onClick={onClick}
			disabled={disabled}
			likeBtn={likeBtn}
			liked={liked}
		>
			{children}
		</StyledButton>
	);
};

export default Button;
