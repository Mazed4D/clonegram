import { database } from '../firebase';
import { get, ref } from 'firebase/database';

const fetchFollowedUsers = async (userId) => {
	const list = await (
		await get(ref(database, `/follows/${userId}`))
	).exportVal();
	if (list === null) {
		return null;
	} else {
		return Object.keys(list);
	}
};

export default fetchFollowedUsers;
