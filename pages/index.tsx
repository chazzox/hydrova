import Layout from '@components/layouts';
import { unstable_getServerSession } from 'next-auth';
import type { GetServerSidePropsContext } from 'next/types';
import { authOptions } from './api/auth/[...nextauth]';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
	// react query or some shit
	return (
		<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
			<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
			<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
		</div>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { accessToken } = await unstable_getServerSession(context.req, context.res, authOptions);

	// some fetch of basic listing
	let listing = {};
	if (accessToken) {
		console.log(`Bearer ${accessToken}`);
		fetch('https://api.reddit.com/', {
			method: 'GET',
			headers: { Authorization: `Bearer ${accessToken}` }
		})
			.then((v) => v.json())
			.then((v1) => console.log(v1))
			.catch((e) => console.log(e));
	}

	return {
		// pass listing as prop
		props: {}
	};
}
export default Index;
