import * as React from 'react';

import Login from '../components/Login';
import Layout from '../components/Layout';

const Index = () => {
	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Login />
		</Layout>
	);
};

export default Index;
