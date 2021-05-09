import * as React from 'react';

import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';

const Mail = () => {
	return (
		<Layout
			title="Hydrova | Inbox"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Main>Mail</Main>
		</Layout>
	);
};

export default Mail;
