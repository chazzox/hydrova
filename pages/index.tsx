import Layout from '@components/layouts';
import { getListing } from 'utils/reddit';
import type { NextPageWithLayout } from './_app';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { REDDIT_THING_TYPES } from '../typings/reddit.d';

const Index: NextPageWithLayout = () => {
	const token = useSession().data?.accessToken;
	/**
	 * @todo transform to using hook useInfiniteQuery
	 */
	const {
		data: { data },
		error,
		isSuccess
	} = useQuery(['listing'], () => getListing(token || '', { limit: '10' }), {
		enabled: !!token,
		initialData: {
			kind: REDDIT_THING_TYPES.LISTING,
			data: { modhash: '', dist: 0, children: [], after: null, before: null }
		}
	});

	return (
		<>
			<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
				<div className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 p-3 shadow-lg">
					{isSuccess &&
						data.children.map(({ data }, i) => {
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

export default Index;
