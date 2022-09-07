import Layout from '@components/layouts';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions } from './api/auth/[...nextauth]';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = (props) => {
	// react query or some shit
	return (
		<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
			<div className="h-full flex-1 overflow-y-auto rounded-xl bg-base-300 p-3 shadow-lg">
				{props.children.map(({ data }) => (
					<>
						<div className="h-20 w-full" key={data.id}>
							<h3 className="font-bold text-white/60">{data.title}</h3>
						</div>
						<div className="divider m-0"></div>
					</>
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

	// some fetch of basic listing
	if (accessToken) {
		try {
			return {
				props: (
					await (
						await fetch('https://oauth.reddit.com/', {
							method: 'GET',
							headers: { Authorization: `Bearer ${accessToken}` }
						})
					).json()
				).data
			};
		} catch (e) {
			return { props: {} };
		}
	}
}
export default Index;
