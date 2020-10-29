import React from 'react';

import './subredditInfoBar.scss';

const subredditInfoBar = () => {
	return (
		<div id="subredditInfoBar">
			<div
				dangerouslySetInnerHTML={{
					__html:
						new DOMParser().parseFromString(
							subredditInfoBar?.data.description_html || '',
							'text/html'
						).documentElement.textContent || ''
				}}
			/>
		</div>
	);
};

export default subredditInfoBar;
