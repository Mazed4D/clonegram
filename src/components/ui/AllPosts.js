import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import Loading from './Loading';
import listFetch from '../../api/listFetch';
import fetchAllUsers from '../../api/fetchAllUsers';

const PostDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const FollowedPosts = ({ userId }) => {
	const [isLoading, setIsLoading] = useState();
	const [nextPageToken, setNextPageToken] = useState();
	const [imageState, setImageState] = useState([]);

	useEffect(() => {
		fetchAllUsers().then((res) => {
			res.forEach((item) => {
				listFetch(item).then((res) => {
					setIsLoading(true);
					setTimeout(() => {
						setImageState((state) => {
							return [...state, ...res];
						});
						setIsLoading(false);
					}, 400);
				});
			});
		});
	}, []);

	return (
		<>
			{isLoading && <Loading />}
			<PostDiv>
				{imageState.map((item) => {
					return (
						<Card
							user={item.user}
							image={item.url}
							title={item.title}
							postName={item.name}
							key={item.name + Date.now()}
						/>
					);
				})}
			</PostDiv>
		</>
	);
};

export default FollowedPosts;
