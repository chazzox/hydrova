import * as React from 'react';

import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';
import Sidebar from '@components/Sidebar';

const Mail = () => {
	return (
		<Layout
			title="Hydrova | Inbox"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Sidebar />
			<Main>Mail</Main>
		</Layout>
	);
};

export default Mail;
