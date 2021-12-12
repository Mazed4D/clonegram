import { getDownloadURL, ref, list } from 'firebase/storage';
import { get, ref as dbRef } from 'firebase/database';
import { storage, database } from '../firebase';

const createObj = (item, user) => {
	let imgObj = {};
	const itemName = item.name.split('.')[0];
	const postName = user + itemName;
	const titleRef = dbRef(database, `/posts/${postName}/title`);
	imgObj.name = postName;
	imgObj.user = user;
	get(titleRef).then((snapshot) => {
		imgObj.title = snapshot.val();
	});
	getDownloadURL(item).then((res) => {
		imgObj.url = res;
	});
	return imgObj;
};

const createList = (images, user) => {
	const list = images.map((item) => {
		return createObj(item, user);
	});

	return list;
};

const listFetch = async (user) => {
	const imagesRef = ref(storage, `/posts/${user}`);

	// let nextToken;

	const images = await list(imagesRef, { maxResults: 24 });
	const imageList = await createList(images.items, user);
	return imageList;
};

export default listFetch;
