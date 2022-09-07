import Layout from '@components/layouts';
import { NextPageWithLayout } from './_app';

const Mail: NextPageWithLayout = () => {
	return (
		<div className="drawer-content m-3 flex items-center justify-center rounded-lg bg-base-300 shadow-lg">
			<h2 className="text-lg font-bold italic text-white/30">Coming soon...</h2>
		</div>
	);
};

Mail.getLayout = (page) => <Layout>{page}</Layout>;

export default Mail;