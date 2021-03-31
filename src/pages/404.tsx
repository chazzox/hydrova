import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';

import { baseTheme, themes } from '@utils/themes';
import WelcomeBox from '@components/WelcomeBox';
import Global from '@utils/Global';

const ThirdText = styled.p`
	color: ${(props) => props.theme.colors.tertiaryText};
`;

const Error404Page: React.FC = () => (
	<ThemeProvider theme={{ colors: themes.defaultDark, base: baseTheme }}>
		<Global />
		<Helmet>
			<title>Hydrova | Redirect from login</title>
			<meta name="description" content="this is the hydrova login redirect page" />
		</Helmet>
		<WelcomeBox
			topText="Hydrova - 404 site"
			bottomText="Site does not exist"
			innerBoxChild={<ThirdText>Please find your way back to the previous page</ThirdText>}
		/>
	</ThemeProvider>
);

export default Error404Page;
