import * as React from 'react';

import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';
import PillSelector from '@components/PillSelector';
import SettingsContainer from '@components/SettingsContainer';

const Content = () => {
	return (
		<Layout
			title="Hydrova | Content"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Main>
				<PillSelector />
				<SettingsContainer>
					<h1>Content</h1>
					<p>TBD</p>
				</SettingsContainer>
			</Main>
		</Layout>
	);
};

export default Content;
