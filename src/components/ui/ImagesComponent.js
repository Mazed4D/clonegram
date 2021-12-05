import React, { useState } from 'react';
import { useEffect } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, list } from 'firebase/storage';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import Loading from './Loading';
import { useNavigate } from 'react-router';
import { onValue } from 'firebase/database';

const ImageBox = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-auto-flow: column;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: calc((1 / 3) * 100vw);
`;

const ImagesComponent = ({ userId }) => {
	const navigate = useNavigate();
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

	const navigateToPosts = () => {
		navigate(`/posts/${userId}`);
	};

	return (
		<>
			{isLoading && <Loading />}
			<ImageBox>
				{images.map((url, index) => {
					console.log(url);
					return (
						<ProfileImage
							url={url}
							alt='sneed'
							key={index}
							navigateToPosts={navigateToPosts}
						/>
					);
				})}
			</ImageBox>
		</>
	);
};

export default ImagesComponent;
