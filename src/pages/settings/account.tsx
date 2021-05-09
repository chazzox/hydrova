import * as React from 'react';

import SettingsContainer from '@components/SettingsContainer';
import PillSelector from '@components/PillSelector';
import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';

const Accounts = () => {
	return (
		<Layout
			title="Hydrova | Account"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Main>
				<PillSelector />
				<SettingsContainer>
					<h1>Account settings</h1>
					<p>TBD</p>
				</SettingsContainer>
			</Main>
		</Layout>
	);
};

export default Accounts;
