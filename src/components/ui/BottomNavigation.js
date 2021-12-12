import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faGlobe,
	faHome,
	faPlusCircle,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const BottomNav = styled.nav`
	background-color: #006891;
	bottom: 0px;
	/* padding: 0 1rem; */
	width: 100vw;
	position: fixed;
	display: flex;
	justify-content: space-around;
	align-items: center;
	@media (min-width: 768px) {
		justify-content: center;
		gap: 7rem;
	}
`;

const BottomNavigation = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	let disabled = true;

	if (user) {
		disabled = false;
	}

	const btnNavigate = (path) => {
		navigate(path);
	};

	return (
		<BottomNav>
			<Button navigateTo='/' navFn={btnNavigate} disabled={disabled}>
				<FontAwesomeIcon icon={faHome} />
			</Button>
			<Button navigateTo='/public' navFn={btnNavigate} disabled={disabled}>
				<FontAwesomeIcon icon={faGlobe} />
			</Button>
			<Button navigateTo='/add' navFn={btnNavigate} disabled={disabled}>
				<FontAwesomeIcon icon={faPlusCircle} />
			</Button>
			{!user && (
				<Button navigateTo={`/`} navFn={btnNavigate} disabled={disabled}>
					<FontAwesomeIcon icon={faUser} />
				</Button>
			)}
			{user && (
				<Button
					navigateTo={`/user/${user.uid}`}
					navFn={btnNavigate}
					disabled={disabled}
				>
					<FontAwesomeIcon icon={faUser} />
				</Button>
			)}
		</BottomNav>
	);
};

export default BottomNavigation;
