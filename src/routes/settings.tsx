import React from 'react';

import PillSelector from 'components/pillSelector';

const Settings = () => {
	return (
		<>
			<PillSelector options={['account', 'appearance', 'content', 'general', 'keybinds']} />
		</>
	);
};

export default Settings;
