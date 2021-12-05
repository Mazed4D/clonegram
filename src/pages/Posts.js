import React from 'react';
import { useParams } from 'react-router';
import UserPosts from '../components/ui/UserPosts';

const Post = () => {
	const { userId } = useParams();

	return <UserPosts userId={userId} />;
};

export default Post;
