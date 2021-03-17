import * as React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import WelcomeBox from 'components/WelcomeBox';
import { themes } from 'utils/themes';

const Global = createGlobalStyle`
	* {
		font-family: 'Roboto', sans-serif;
		box-sizing: border-box;
		letter-spacing: 0.5pt;
	}

	body {
		background-color: ${(props) => props.theme.primaryBackground};
	}

	::-webkit-scrollbar {
		background-color: rgba(0, 0, 0, 0);
		width: 16px;
	}
	::-webkit-scrollbar-track {
		background-color: var(--background-color-tertiary);
	}
	::-webkit-scrollbar-track:hover {
		background-color: var(--background-color-secondary);
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--text-color-tertiary);
		border-radius: 16px;
		border: 6px solid var(--background-color-tertiary);
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: var(--text-color-secondary);
		border: 3px solid var(--background-color-secondary);
	}
	::-webkit-scrollbar-button {
		display: none;
	}
`;

const Index = () => {
	return (
		<ThemeProvider theme={themes.defaultDark}>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
				rel="stylesheet"
			/>
			<Global />
			<WelcomeBox />
		</ThemeProvider>
	);
};

export default Index;
