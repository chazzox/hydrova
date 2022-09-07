import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const General: NextPageWithLayout = () => {
	return <>settings</>;
};

General.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default General;
