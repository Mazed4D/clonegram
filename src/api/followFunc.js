import { database } from '../firebase';
import { ref, get, set, remove, update } from 'firebase/database';

const followFunc = async (userId, followedUserId) => {
	const followedUserRef = ref(database, `/followed/${followedUserId}`);
	const followUserRef = ref(database, `/follows/${userId}`);
	const isFollowingRef = ref(database, `/followed/${followedUserId}/${userId}`);

	const followAction = () => {
		console.log('add');
		update(followedUserRef, {
			[userId]: true,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		update(followUserRef, {
			[followedUserId]: true,
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const unfollowAction = () => {
		console.log('remove');
		remove(ref(database, `/followed/${followedUserId}/${userId}`))
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		remove(ref(database, `/follows/${userId}/${followedUserId}`))
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const isFollowing = await get(isFollowingRef)
		.then((res) => {
			if (res.val() === null) {
				followAction();
			} else {
				unfollowAction();
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

export default followFunc;
