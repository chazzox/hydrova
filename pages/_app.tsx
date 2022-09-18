import { SessionProvider } from 'next-auth/react';
import './styles.css';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const [queryClient] = useState(() => new QueryClient());
	const getLayout = Component.getLayout ?? ((page) => page);

	useEffect(() => {
		themeChange(false);
	}, [pageProps]);

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<SessionProvider session={pageProps.session} refetchInterval={0}>
					{getLayout(<Component {...pageProps} />)}
				</SessionProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}
