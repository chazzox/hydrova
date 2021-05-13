import * as React from 'react';

import Layout from '@components/Layout';
import { Main } from '@components/DashBoard';
import Sidebar from '@components/Sidebar';

const Post = () => {
	return (
		<Layout
			title="Hydrova | Create a Post"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Sidebar />
			<Main>Post</Main>
		</Layout>
	);
};

export default Post;
