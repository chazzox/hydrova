import Layout from '@components/layouts';
import Row from '@components/row';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Virtuoso } from 'react-virtuoso';
import { getListing } from 'utils/reddit';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
	const token = useSession().data?.accessToken;

	const { data, fetchNextPage } = useInfiniteQuery(
		['listing'],
		(p) => getListing(token || '', { limit: 25, after: p?.pageParam }),
		{
			enabled: !!token,
			getNextPageParam: (lastPage, _) => lastPage.data.after ?? undefined,
			getPreviousPageParam: (firstPage, _) => firstPage.data.before ?? undefined
		}
	);

	return (
		<>
			<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
				<Virtuoso
					className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 py-1 shadow-lg"
					endReached={() => fetchNextPage()}
					fixedItemHeight={128}
					overscan={1000}
					data={data?.pages.map((v) => v.data.children).flat()}
					itemContent={(index, { data }) => <Row key={index} {...data} />}
				/>

				<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
			</div>
		</>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export default Index;
