import Layout from '@components/layouts';
import { getListing } from 'utils/reddit';
import type { NextPageWithLayout } from './_app';

import { useQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import { Post, REDDIT_THING_TYPES } from '../typings/reddit.d';
import { authOptions } from './api/auth/[...nextauth]';

const Index: NextPageWithLayout<{ initialData: Post; token: string }> = ({
	initialData,
	token
}) => {
	/**
	 * @todo transform to using hook useInfiniteQuery
	 */
	const { data, error, isSuccess } = useQuery(
		['listing'],
		() => getListing(token, { limit: '10' }),
		{
			initialData
		}
	);

	return (
		<>
			<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
				<div className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 p-3 shadow-lg">
					{isSuccess &&
						data.data.children.map(({ data }, i) => {
							const linkURL = new URL('https://www.reddit.com');
							linkURL.pathname = data.permalink;

							return (
								<>
									<Link href={linkURL} key={i} target="_blank">
										<div className="h-32 w-full" key={data.id}>
											<h3 className="font-bold text-white/60">
												{data.title}
											</h3>
											<p className="link">{data.url}</p>
										</div>
									</Link>
									<div className="divider m-0"></div>
								</>
							);
						})}
				</div>
				<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
			</div>
			{!isSuccess && <div>{JSON.stringify(error)}</div>}
		</>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await unstable_getServerSession(context.req, context.res, authOptions);

	const emptyListing: Post = {
		kind: REDDIT_THING_TYPES.LISTING,
		data: { modhash: '', dist: 0, children: [], after: null, before: null }
	};
	return {
		props: {
			initialData: emptyListing,
			token: session?.accessToken
		}
	};
}

export default Index;
