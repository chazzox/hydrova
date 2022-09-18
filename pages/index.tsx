import Layout from '@components/layouts';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSidePropsContext } from 'next/types';
import { getListing } from 'utils/reddit';
import { authOptions } from './api/auth/[...nextauth]';
import type { NextPageWithLayout } from './_app';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Listing } from '../typings/reddit.d';

const Index: NextPageWithLayout<{ initialData: Listing; token: string }> = ({ token }) => {
	const { data } = useQuery(['listing'], () => getListing(token));

	return (
		<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
			<div className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 p-3 shadow-lg">
				{data?.data.children.map(({ data }) => (
					<Link href={`https://reddit.com/${data.permalink}`}>
						<a target="_blank">
							<div className="h-32 w-full" key={data.id}>
								<h3 className="font-bold text-white/60">{data.title}</h3>
								<p className="link">{data.url}</p>
							</div>
							<div className="divider m-0"></div>
						</a>
					</Link>
				))}
			</div>
			<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
		</div>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	// @ts-ignore
	const { accessToken } = await unstable_getServerSession(context.req, context.res, authOptions);
	const queryClient = new QueryClient();

	// some fetch of basic listing
	if (accessToken) {
		await queryClient.prefetchQuery(['listing'], () =>
			getListing(accessToken, { limit: '10' })
		);
		return {
			props: { dehydratedState: dehydrate(queryClient), token: accessToken }
		};
	}
}
export default Index;
