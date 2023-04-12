import Link from 'next/link';

const settings = {
	'/settings/general': 'General',
	'/settings/appearance': 'Appearance',
	'/settings/account': 'Account',
	'/settings/keybindings': 'Keybindings'
} as const;

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="drawer-content flex flex-1 flex-col p-6">
			<div className="tabs tabs-boxed mx-auto mb-4 gap-2 p-2 shadow-xl">
				{Object.entries(settings).map(([settingPillPath, settingPillTextValue], i) => (
					<Link key={i} href={settingPillPath} replace>
						<a className="tab rounded-lg capitalize transition-colors hover:bg-accent hover:text-accent-content">
							{settingPillTextValue}
						</a>
					</Link>
				))}
			</div>
			<div className="flex-1 flex-col rounded-xl bg-base-300 p-10 shadow-lg">{children}</div>
		</div>
	);
}
