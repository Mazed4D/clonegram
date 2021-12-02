import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState();
	const [error, setError] = useState();
	const [res, setRes] = useState();

	useEffect(() => {
		setLoading(true);
		const unsubscribe = onAuthStateChanged(auth, (res) => {
			res ? setUser(res) : setUser(null);
			setError('');
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const signup = (email, password, name) => {
		setLoading(true);
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				return updateProfile(auth.currentUser, {
					displayName: name,
				});
				// const user = userCredential.user;
				// // ...
			})
			.then((res) => {
				setRes(res);
			})
			.catch((error) => {
				setError(error.code + ' ' + error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const signin = (email, password) => {
		setLoading(true);
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				setRes(res);
			})
			.catch((error) => {
				setError(error.code + ' ' + error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const logout = () => {
		signOut(auth);
	};

	const value = {
		user,
		loading,
		error,
		res,
		signup,
		signin,
		logout,
	};

	return (
		<AuthContext.Provider value={value}> {children} </AuthContext.Provider>
	);
};

export default AuthProvider;
