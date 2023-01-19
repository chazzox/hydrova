import SettingsLayout from '@components/layouts/settingsLayout';
import { NextPageWithLayout } from 'pages/_app';

const SELECTED_THEMES = [
	'retro',
	'night',
	'forest',
	'dark',
	'coffee',
	'luxury',
	'aqua',
	'cyberpunk'
] as const;

const Appearance: NextPageWithLayout = () => {
	return (
		<>
			<h2 className="text-lg font-bold text-white/80">Colors</h2>
			<div className="my-3 flex flex-wrap gap-8">
				{SELECTED_THEMES.map((v, i) => (
					<button
						key={i}
						data-theme={v}
						data-set-theme={v}
						data-act-class="btn-active"
						className="btn btn-primary w-36 capitalize"
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
