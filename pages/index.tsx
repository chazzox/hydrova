import Layout from '@components/layouts';
import { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
	return (
		<div className="drawer-content flex flex-row items-center justify-center gap-3 p-3">
			<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
			<div className="h-full flex-1 rounded-xl bg-base-300 shadow-lg"></div>
		</div>
	);
};

Index.getLayout = (page) => <Layout>{page}</Layout>;

export default Index;
