import React, { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import Loading from './Loading';

const Form = styled.form`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	label {
		font-weight: 600;
		color: white;
	}
	input {
		border-radius: 10px;
		border: none;
		height: 1.5rem;
		width: 60vw;
		text-align: center;
		@media (min-width: 768px) {
			width: 70%;
		}
	}
	button {
		border-radius: 10px;
		border: none;
		font-weight: bold;
		transition: all 0.1s ease-in;
		&:hover,
		:active {
			background-color: black;
			color: #efefef;
			transform: scale(1.1);
		}
	}
	.submitBtn {
		font-size: large;
		margin-top: 2rem;
		padding: 1rem 3rem;
	}
	.passwdDiv {
		display: flex;
		justify-content: center;
		align-items: center;
		input {
			height: 1.65rem;
			padding: 0;
			margin-right: -2.5rem;
		}
		button {
			height: 1.65rem;
		}
		@media (min-width: 768px) {
			width: 100%;
		}
	}

	span {
		color: white;
		max-width: 25rem;
		margin: 0 2rem;
	}
	.newUserBtn {
		padding: 0.5rem;
		background-color: #0096ce;
		color: white;
	}
`;

const Login = () => {
	const { signup, signin, loading, error, res } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [newUser, setNewUser] = useState(false);
	const [showPwd, setShowPwd] = useState(false);
	const emailRef = useRef('');
	const passwordRef = useRef('');
	const nameRef = useRef('');

	const emailHandler = () => {
		setEmail(emailRef.current.value);
	};
	const passwordHandler = () => {
		setPassword(passwordRef.current.value);
	};
	const nameHandler = () => {
		setName(nameRef.current.value);
	};
	const showPswd = () => {
		if (passwordRef.current.type === 'password') {
			setShowPwd(true);
			passwordRef.current.type = 'text';
		} else {
			setShowPwd(false);
			passwordRef.current.type = 'password';
		}
	};
	const changeAuth = () => {
		setNewUser((state) => {
			return !state;
		});
	};
	const submitHandler = async (event) => {
		event.preventDefault();
		const passwordRegex =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		if (passwordRegex.test(password)) {
			if (newUser) {
				await signup(email, password, name);
			} else {
				await signin(email, password);
			}
			if (error) {
				alert(error);
			} else {
				alert('here!');
				(() => {
					navigate('/');
				})();
			}
		} else {
			alert(`Bad password or user doesn't exist.`);
		}
	};

	return (
		<Form>
			{loading && <Loading />}
			<label htmlFor='email'>Email</label>
			<input
				type='email'
				value={email}
				name='email'
				id='emailInput'
				onChange={emailHandler}
				ref={emailRef}
			/>
			{newUser && (
				<>
					<label htmlFor='name'>Display name</label>
					<input
						type='text'
						value={name}
						name='name'
						id='nameInput'
						onChange={nameHandler}
						ref={nameRef}
					/>
				</>
			)}
			<label htmlFor='password'>Password</label>
			<div className='passwdDiv'>
				<input
					type='password'
					value={password}
					name='password'
					id='passwordInput'
					onChange={passwordHandler}
					ref={passwordRef}
				/>
				<button onClick={showPswd} type='button'>
					{showPwd ? 'Hide' : 'Show'}
				</button>
			</div>
			<span>
				{newUser &&
					'Password must contain at least 8 characters including at least one number, one symbol and one letter.'}
			</span>
			<button type='submit' className='submitBtn' onClick={submitHandler}>
				{newUser ? 'Sign up' : 'Log in'}
			</button>
			<button className='newUserBtn' type='button' onClick={changeAuth}>
				{newUser ? 'Already have an account?' : 'New user? Tap here!'}
			</button>
		</Form>
	);
};

export default Login;
