import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getJSON } from 'js-cookie';

import { refreshAccessToken, setNoAuthCookies } from '@redux/SettingSlice';
import { AppDispatch, ReduxStateType } from '@redux/store';
import { baseTheme, themes } from '@utils/themes';
import Global from '@utils/Global';

interface LayoutProps {
	title: string;
	description: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
	const dispatch = useDispatch<AppDispatch>();

	const authenticationResultReturned = useSelector((state: ReduxStateType) => state.settings.authenticationResultReturned);
	const themeName = useSelector((state: ReduxStateType) => state.settings.themeKey);

	React.useEffect(() => {
		const oauthCookieData = getJSON('refresh_token') as string;
		if (oauthCookieData) dispatch(refreshAccessToken({ refresh_token: oauthCookieData }));
		else dispatch(setNoAuthCookies());
	}, []);

	return (
		<ThemeProvider theme={{ colors: themes[themeName], base: baseTheme }}>
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
			{authenticationResultReturned && children}
		</ThemeProvider>
	);
};

export default Layout;
