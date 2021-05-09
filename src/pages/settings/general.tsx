import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';
import PillSelector from '@components/PillSelector';
import SettingsContainer from '@components/SettingsContainer';
import * as React from 'react';

const General = () => {
	return (
		<Layout
			title="Hydrova | General Preferences"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Main>
				<PillSelector />
				<SettingsContainer>
					<h1>General</h1>
					<p>TBD</p>
				</SettingsContainer>
			</Main>
		</Layout>
	);
};

export default General;
