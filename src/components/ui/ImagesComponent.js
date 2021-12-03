import React, { useState } from 'react';
import { useEffect } from 'react';
import { storage } from '../../firebase';
import { getDownloadURL, ref, list } from 'firebase/storage';
import styled from 'styled-components';
import ProfileImage from './ProfileImage';

const ImageBox = styled.div`
	display: grid;
	width: 100%;
	height: 100%;
	grid-auto-flow: column;
	grid-template-columns: 1fr 1fr 1fr;
	grid-auto-rows: calc((1 / 3) * 100vw);
`;

const ImagesComponent = ({ userId }) => {
	const imagesRef = ref(storage, `/posts/${userId}`);
	const [images, setImages] = useState([]);
	useEffect(() => {
		let imageUrls = [];
		const listFetch = async () => {
			await list(imagesRef, { maxResults: 12 }).then((res) => {
				res.items.forEach((item) => {
					getDownloadURL(item).then((res) => {
						imageUrls.push(res);
					});
				});
			});
		};
		listFetch();
		setTimeout(() => {
			setImages(imageUrls);
		}, 400);
	}, []);

	return (
		<ImageBox>
			{images.map((url, index) => {
				console.log(url);
				return <ProfileImage url={url} alt='sneed' key={index} />;
			})}
		</ImageBox>
	);
};

export default ImagesComponent;
