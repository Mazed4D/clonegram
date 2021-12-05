import React, { useContext, useState, useEffect } from 'react';
import { auth, database } from '../firebase';
import { set, ref } from 'firebase/database';
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
				set(ref(database, `/users/${userCredential.user.uid}`), name);
				return updateProfile(auth.currentUser, {
					displayName: name,
				});
			})
			.then((res) => {
				// console.log(res)
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
				// console.log(res)
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
		signup,
		signin,
		logout,
	};

	return (
		<AuthContext.Provider value={value}> {children} </AuthContext.Provider>
	);
};

export default AuthProvider;
