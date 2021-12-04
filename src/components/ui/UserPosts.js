import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { database } from '../../firebase';
import { storage } from '../../firebase';
import { getDownloadURL, ref, list } from 'firebase/storage';
import { onValue, ref as dbRef } from 'firebase/database';
import Loading from './Loading';

const PostDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const UserPosts = ({ userId }) => {
	const imagesRef = ref(storage, `/posts/${userId}`);
	const [images, setImages] = useState([]);
	const [titles, setTitles] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [nextPageToken, setNextPageToken] = useState();

	useEffect(() => {
		let imageUrls = [];
		let imageTitles = [];
		const listFetch = async () => {
			await list(imagesRef, { maxResults: 12 }).then((res) => {
				setNextPageToken(res.nextPageToken);
				res.items.forEach((item) => {
					const itemName = item.name.split('.')[0];
					const titleRef = dbRef(database, `/posts/${userId}${itemName}/title`);
					onValue(titleRef, (snapshot) => {
						const data = snapshot.val();
						imageTitles.push(data);
					});
					getDownloadURL(item).then((res) => {
						imageUrls.push(res);
					});
				});
			});
		};
		listFetch();
		setIsLoading(true);
		setTimeout(() => {
			setImages(imageUrls);
			setTitles(imageTitles);
			setIsLoading(false);
		}, 700);
	}, []);

	const loadMore = async () => {
		let imageUrls = [];
		const listFetch = async () => {
			await list(imagesRef, { maxResults: 12, pageToken: nextPageToken }).then(
				(res) => {
					setNextPageToken(res.nextPageToken);
					res.items.forEach((item) => {
						getDownloadURL(item).then((res) => {
							imageUrls.push(res);
						});
					});
				}
			);
		};
		listFetch();
		setIsLoading(true);
		setTimeout(() => {
			setImages((state) => {
				return [...state, imageUrls];
			});
			setIsLoading(false);
		}, 700);
	};

	return (
		<>
			{isLoading && <Loading />}
			<PostDiv>
				{images.map((url, index) => {
					return <Card image={url} title={titles[index]} />;
				})}
			</PostDiv>
		</>
	);
};

export default UserPosts;
