import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const settings = {
	'/settings/general': 'General',
	'/settings/appearance': 'Appearance',
	'/settings/account': 'Account',
	'/settings/keybindings': 'Keybindings'
} as const;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	return (
		<div className="drawer-content flex flex-1 flex-col p-6">
			<div className="tabs tabs-boxed mx-auto mb-4 gap-2 p-2 shadow-xl">
				{Object.entries(settings).map(([settingPillPath, settingPillTextValue], i) => (
					<Link key={i} href={settingPillPath} replace>
						<a
							className={classNames(
								'tab rounded-lg capitalize transition-colors hover:bg-accent hover:text-accent-content',
								{ 'tab-active': router.pathname == settingPillPath }
							)}
						>
							{settingPillTextValue}
						</a>
					</Link>
				))}
			</div>
			<div className="flex-1 flex-col rounded-xl bg-base-300 p-10 shadow-lg">{children}</div>
		</div>
	);
}
