import { database } from '../firebase';
import { get, ref } from 'firebase/database';

const fetchAllUsers = async () => {
	const list = await (await get(ref(database, `/users`))).exportVal();
	return Object.keys(list);
};

export default fetchAllUsers;
