import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { storage } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { uploadBytes, ref } from 'firebase/storage';
import { ref as dbRef, set } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigate } from 'react-router';
import Loading from './Loading';

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
	.imageLabel,
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

const StyledTitleDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	label {
		background-color: white;
		border-radius: 10px;
		padding: 0.5rem;
		width: 100%;
		text-align: center;
	}
`;

const StyledInput = styled.input`
	border-radius: 10px;
	border: none;
	width: 100%;
	text-align: center;
`;

const AddComponent = () => {
	const [image, setImage] = useState();
	const [title, setTitle] = useState('');
	const [imgBlob, setImgBlob] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { user } = useAuth();

	const changeHandler = (event) => {
		const filename = event.target.files[0].name;
		setImage(event.target.files[0]);
		setImgBlob(URL.createObjectURL(event.target.files[0]));
	};

	const titleChangeHandler = (event) => {
		setTitle(event.target.value);
	};

	const submitImage = async () => {
		setIsLoading(true);
		const imgName = Date.now();
		const path = `/posts/${user.uid}/${imgName}`;
		const metaPath = `/posts/${user.uid}${imgName}`;
		const postRef = ref(storage, path);
		const metaRef = dbRef(database, metaPath);
		set(metaRef, {
			title: title,
		})
			.then((res) => {})
			.catch((err) => {
				console.info(err);
			});
		uploadBytes(postRef, image)
			.then(() => {
				setIsLoading(false);
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<ImageUpload>
			{isLoading && <Loading />}
			<label htmlFor='image' className='imageLabel'>
				Choose image
			</label>
			<input
				type='file'
				name='image'
				id='image'
				accept='image/png, image/jpeg'
				onChange={changeHandler}
				style={{ visibility: 'hidden' }}
				required
			/>
			<Image src={imgBlob} alt='' />
			{image && (
				<StyledTitleDiv>
					<label htmlFor='title'>Image title</label>
					<StyledInput
						type='text'
						name='title'
						id='title'
						value={title}
						onChange={titleChangeHandler}
						required
						className='titleInput'
						maxLength={14}
					/>
				</StyledTitleDiv>
			)}

			{image && title && <button onClick={submitImage}>Submit image</button>}
		</ImageUpload>
	);
};

export default AddComponent;
