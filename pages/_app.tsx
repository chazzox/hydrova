import { SessionProvider } from 'next-auth/react';
import './styles.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout = NextPage & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<SessionProvider session={pageProps.session} refetchInterval={0}>
			{getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	);
}
