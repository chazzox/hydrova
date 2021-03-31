import * as React from 'react';
import styled from 'styled-components';

import Sidebar from './Sidebar';

export const Main = styled.div`
	max-height: calc(100vh - 2 * (${(props) => props.theme.base.paddingSecondary}px));
	background-color: ${(props) => props.theme.colors.tertiaryBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusSecondary}px;
	padding-bottom: ${(props) => props.theme.base.paddingPrimary}px;
	padding-top: ${(props) => props.theme.base.paddingPrimary}px;
	margin: ${(props) => props.theme.base.paddingSecondary}px;
	position: relative;
	overflow: hidden;
	max-width: 100%;
	margin-right: 0;
	flex-shrink: 1;
	flex-grow: 2;
	width: 50%;
	flex: 1;
`;

const Dashboard = () => {
	return (
		<>
			<Sidebar />
			<Main>Poggers</Main>
		</>
	);
};

export default Dashboard;
