import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from './index';

const settings = {
	'/settings/general': 'General',
	'/settings/appearance': 'Appearance',
	'/settings/account': 'Account',
	'/settings/keybindings': 'Keybindings'
} as const;

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	return (
		<Layout>
			<div className="drawer-content flex flex-1 flex-col p-6">
				<div className="tabs tabs-boxed mx-auto mb-4 gap-2 p-2 shadow-xl">
					{Object.entries(settings).map(([k, v], i) => (
						<Link key={i} href={k} replace>
							<a
								className={classNames(
									'tab rounded-lg capitalize transition-colors hover:bg-accent hover:text-accent-content',
									{ 'tab-active': router.pathname == k }
								)}
							>
								{v}
							</a>
						</Link>
					))}
				</div>
				<div className="flex-1 flex-col rounded-xl bg-base-300 p-10 shadow-lg">
					{children}
				</div>
			</div>
		</Layout>
	);
};

export default SettingsLayout;
