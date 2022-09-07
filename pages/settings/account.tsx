import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const Account: NextPageWithLayout = () => {
	return <>settings</>;
};

Account.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Account;
