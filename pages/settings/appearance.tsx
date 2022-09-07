import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

const selectedThemes = ['retro', 'night', 'forest', 'dark', 'coffee', 'luxury', 'aqua'] as const;

const Appearance: NextPageWithLayout = () => {
	useEffect(() => {
		themeChange(false);
		// 👆 false parameter is required for react project
	}, []);

	return (
		<>
			<h2 className="text-lg font-bold text-white/80">Colors</h2>
			<div>
				{selectedThemes.map((v) => (
					<button
						data-theme={v}
						data-set-theme={v}
						data-act-class="btn-active"
						className="btn btn-primary m-2 capitalize"
					>
						{v}
					</button>
				))}
			</div>
		</>
	);
};

Appearance.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Appearance;
