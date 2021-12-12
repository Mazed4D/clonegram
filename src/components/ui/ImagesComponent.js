import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';
import Loading from './Loading';
import { useNavigate } from 'react-router';
import listFetch from '../../api/listFetch';

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
	const [isLoading, setIsLoading] = useState(false);
	const [nextPageToken, setNextPageToken] = useState();
	const [imageState, setImageState] = useState([]);

	useEffect(() => {
		listFetch(userId).then((res) => {
			setIsLoading(true);
			setTimeout(() => {
				setImageState((state) => {
					return [...state, ...res];
				});
				setIsLoading(false);
			}, 400);
		});
	}, []);

	// const loadMore = async () => {
	// 	let imageUrls = [];
	// 	const listFetch = async () => {
	// 		await list(imagesRef, { maxResults: 12, pageToken: nextPageToken }).then(
	// 			(res) => {
	// 				setNextPageToken(res.nextPageToken);
	// 				res.items.forEach((item) => {
	// 					getDownloadURL(item).then((res) => {
	// 						imageUrls.push(res);
	// 					});
	// 				});
	// 			}
	// 		);
	// 	};
	// 	listFetch();
	// 	setIsLoading(true);
	// 	setTimeout(() => {
	// 		setImages((state) => {
	// 			return [...state, imageUrls];
	// 		});
	// 		setIsLoading(false);
	// 	}, 700);
	// };

	const navigateToPosts = () => {
		navigate(`/posts/${userId}`);
	};

	return (
		<>
			{isLoading && <Loading />}
			<ImageBox>
				{imageState.map((item) => {
					return (
						<ProfileImage
							url={item.url}
							alt={item.title}
							key={item.name}
							navigateToPosts={navigateToPosts}
						/>
					);
				})}
			</ImageBox>
		</>
	);
};

export default ImagesComponent;
