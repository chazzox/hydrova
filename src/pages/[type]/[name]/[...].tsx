import React from 'react';

import styled from 'styled-components';

import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';

const StyledMain = styled(Main)`
	overflow-wrap: break-word;
`;

const Page = (props: any) => {
	return (
		<Layout
			title="Hydrova | Reddit Client"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<StyledMain>
				<p>{JSON.stringify(props)}</p>
			</StyledMain>
		</Layout>
	);
};

export default Page;
