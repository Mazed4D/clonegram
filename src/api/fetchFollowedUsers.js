import { database } from '../firebase';
import { get, ref } from 'firebase/database';

const fetchFollowedUsers = async (userId) => {
	const list = await (
		await get(ref(database, `/follows/${userId}`))
	).exportVal();
	return Object.keys(list);
	// .then((res) => {
	// console.log(Object.keys(res.val()));
	// return Object.keys(res.val());
	// })
	// .catch((err) => {
	// console.log(err);
	// });
};

export default fetchFollowedUsers;
