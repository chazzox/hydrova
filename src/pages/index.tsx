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
			<Global />
			<WelcomeBox topText="Hydrova" bottomText="High Performance Reddit Client">
				<p>test</p>
			</WelcomeBox>
		</ThemeProvider>
	);
};

export default Index;
