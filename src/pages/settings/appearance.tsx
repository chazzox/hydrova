import * as React from 'react';
import styled, { ThemeContext, ThemeProvider, useTheme } from 'styled-components';

import { Main } from '@components/DashBoard';
import Layout from '@components/Layout';
import Sidebar from '@components/Sidebar';
import { baseTheme, themes } from '@utils/themes';
import PillSelector from '@components/PillSelector';
import SettingsContainer from '@components/SettingsContainer';

const ThemePreview = styled.div`
	padding: ${(props) => props.theme.base.paddingPrimary}px;
	max-width: calc(300px - ${(props) => props.theme.base.paddingPrimary}px);
	background: ${(props) => props.theme.colors.primaryBackground};
	color: ${(props) => props.theme.colors.primaryText};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	margin: 3px;
	text-align: center;
	display: inline-block;
	cursor: pointer;
	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;
	text-transform: capitalize;
	width: 100%;
`;

const Appearance = () => {
	return (
		<Layout
			title="Hydrova | Theming"
			description="Hydrova is a react based reddit client that offers a different way of browsing reddit content"
		>
			<Sidebar />
			<Main>
				<PillSelector />
				<SettingsContainer>
					<h1>Color Theme</h1>
					<p>The colors used to style the user interface</p>
					{Object.entries(themes).map(([themeKey, theme]) => (
						<ThemeProvider key={themeKey} theme={{ colors: theme, base: baseTheme }}>
							<ThemePreview>{theme.name}</ThemePreview>
						</ThemeProvider>
					))}
				</SettingsContainer>
			</Main>
		</Layout>
	);
};

export default Appearance;