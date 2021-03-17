import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import WelcomeBox from 'components/WelcomeBox';
import { themes, baseTheme } from 'utils/themes';
import Global from 'utils/Global';
import { generateAuthUrl } from 'utils/generateAuthURL';

const Index = () => {
	React.useEffect(() => {
		console.log(generateAuthUrl());
	}, []);
	return (
		// @todo: rework the themes into something more coherency and clean, maybe improve types/data structure
		<ThemeProvider theme={{ colors: themes.defaultDark, base: baseTheme }}>
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link
				href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
				rel="stylesheet"
			/>
			<Global />
			<WelcomeBox topText="Hydrova" bottomText="High Performance Reddit Client">
				<p>test</p>
			</WelcomeBox>
		</ThemeProvider>
	);
};

export default Index;
