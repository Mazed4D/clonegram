import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	transition: all 0.1s ease-in;
	cursor: pointer;
	&:hover,
	:active {
		transform: scale(0.9);
		border-radius: 10px;
	}
`;

const ProfileImage = ({ url, navigateToPosts }) => {
	return <StyledImage src={url} alt='' onClick={navigateToPosts} />;
};

export default ProfileImage;
