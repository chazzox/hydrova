import * as React from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import Global from '@utils/Global';
import { baseTheme, themes } from '@utils/themes';

interface LayoutProps {
	title: string;
	description: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
	return (
		<ThemeProvider theme={{ colors: themes.defaultDark, base: baseTheme }}>
			<Helmet>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="reddit, Reddit, reddit client, reddit improved, chazzox, hydrova, hydrova reddit, Hydrova"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
					rel="stylesheet"
				/>
			</Helmet>
			<Global />
			{children}
		</ThemeProvider>
	);
};

export default Layout;
