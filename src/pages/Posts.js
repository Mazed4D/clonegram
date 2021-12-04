import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Card from '../components/ui/Card';
import { storage } from '../firebase';
import { getDownloadURL, ref, list } from 'firebase/storage';
import UserPosts from '../components/ui/UserPosts';

const PostDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Post = () => {
	const { userId } = useParams();
	const imagesRef = ref(storage, `/posts/${userId}`);
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [nextPageToken, setNextPageToken] = useState();

	useEffect(() => {
		let imageUrls = [];
		const listFetch = async () => {
			await list(imagesRef, { maxResults: 12 }).then((res) => {
				setNextPageToken(res.nextPageToken);
				res.items.forEach((item) => {
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

	return <UserPosts userId={userId} />;
};

export default Post;
