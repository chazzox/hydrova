import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const Appearance: NextPageWithLayout = () => {
	return <>settings</>;
};

Appearance.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Appearance;
