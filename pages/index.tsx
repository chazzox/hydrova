import Layout from '@components/layouts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { getListing } from 'utils/reddit';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
	const token = useSession().data?.accessToken;

	const { data, fetchNextPage } = useInfiniteQuery(
		['listing'],
		(p) => getListing(token || '', { limit: '15', after: p?.pageParam }),
		{
			enabled: !!token,
			getNextPageParam: (lastPage, _) => {
				console.log(lastPage, _);
				return lastPage.data.after ?? undefined;
			},
			getPreviousPageParam: (firstPage, _) => firstPage.data.before ?? undefined
		}
	);

	const isMounted = useRef(false);

	useEffect(() => {
		console.log(data);
		if (!isMounted.current) {
			isMounted.current = true;

			setTimeout(fetchNextPage, 1000);
			return;
		}
	}, [data]);

	return (
		<>
			<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
				<div className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 p-3 shadow-lg">
					<Virtuoso
						endReached={() => fetchNextPage()}
						fixedItemHeight={128}
						overscan={1000}
						data={data?.pages.map((v) => v.data.children).flat()}
						itemContent={(index, { data }) => {
							const linkURL = new URL('https://www.reddit.com');
							linkURL.pathname = data.permalink;

							return (
								<span key={index}>
									<Link href={linkURL} target="_blank">
										<div className="h-32 w-full" key={data.id}>
											<h3 className="font-bold text-white/60">
												{data.title}
											</h3>
											<p className="link">{data.url}</p>
										</div>
									</Link>
									<div className="divider m-0"></div>
								</span>
							);
						}}
					/>
				</div>
				<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
			</div>
		</>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export default Index;
