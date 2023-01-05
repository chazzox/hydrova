import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import { Session } from 'next-auth/core/types';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import './styles.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps<{
	dehydratedState: unknown;
	session: Session | null | undefined;
}> & {
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
				<SessionProvider session={pageProps.session} refetchInterval={6000}>
					{/* @ts-ignore */}
					{getLayout(<Component {...pageProps} />)}
				</SessionProvider>
			</Hydrate>
		</QueryClientProvider>
	);
}
