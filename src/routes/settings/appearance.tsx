import React from 'react';

import ThemePreview from 'components/themePreview';

const Appearance = () => {
	return (
		<div id="settings">
			<h1>Color Theme</h1>
			<p>The colors used to style the user interface</p>
			<ThemePreview themeName="defaultDark" />
			<ThemePreview themeName="defaultLight" />
			<ThemePreview themeName="bestOfBoth" />
			<ThemePreview themeName="gruvboxLight" />
			<ThemePreview themeName="gruvboxDark" />
		</div>
	);
};

export default Appearance;
