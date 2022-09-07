import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const General: NextPageWithLayout = () => {
	return (
		<>
			<h2 className="text-lg font-bold italic text-white/30">Coming soon...</h2>
		</>
	);
};

General.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default General;
