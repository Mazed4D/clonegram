import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Image = styled.img`
	width: 60%;
	height: auto;
	border-radius: 10px;

	&:active,
	:hover {
		color: white;
		transform: scale(1.1);
	}
	transition: all 0.1s ease-in;
`;

const ImageUpload = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 2rem;
	label,
	button {
		border: none;
		background-color: white;
		padding: 1rem;
		font-weight: 500;
		border-radius: 10px;
		cursor: pointer;
		&:active,
		:hover {
			background-color: black;
			color: white;
			transform: scale(1.1);
		}
		transition: all 0.1s ease-in;
	}
	button {
		font-weight: 800;
	}
`;

const AddComponent = () => {
	const [image, setImage] = useState();

	const changeHandler = (event) => {
		setImage(URL.createObjectURL(event.target.files[0]));
		console.info(event);
	};

	const submitImage = () => {};

	return (
		<ImageUpload>
			<label htmlFor='image'>Choose image</label>
			<input
				type='file'
				name='image'
				id='image'
				accept='image/png, image/jpeg'
				onChange={changeHandler}
				style={{ visibility: 'hidden' }}
			/>
			<Image src={image} alt='' />
			{image && <button onClick={submitImage}>Submit image</button>}
		</ImageUpload>
	);
};

export default AddComponent;
