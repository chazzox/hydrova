import Layout from '@components/Layout';
import React from 'react';

const Page = (props) => {
	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<p>{JSON.stringify(props)}</p>
		</Layout>
	);
};

export default Page;
