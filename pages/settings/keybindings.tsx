import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const Keybindings: NextPageWithLayout = () => {
	return <>settings</>;
};

Keybindings.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Keybindings;
