import SettingsLayout from '@components/layouts/settingsLayout';
import { signOut } from 'next-auth/react';
import { NextPageWithLayout } from 'pages/_app';

const Account: NextPageWithLayout = () => {
	return (
		<>
			<h2 className="text-lg font-bold text-white/80">Account</h2>
			<button className="btn my-3 px-8" onClick={() => signOut()}>
				Logout
			</button>
		</>
	);
};

Account.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Account;
