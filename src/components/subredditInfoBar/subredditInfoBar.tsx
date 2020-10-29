import React from 'react';

import './subredditInfoBar.scss';

const subredditInfoBar = ({ infoBar }: { infoBar: AboutApiResponse }) => {
	return (
		<div id="subredditInfoBar">
			<div
				dangerouslySetInnerHTML={{
					__html:
						new DOMParser().parseFromString(infoBar.data.description_html || '', 'text/html')
							.documentElement.textContent || ''
				}}
			/>
		</div>
	);
};

export default subredditInfoBar;
