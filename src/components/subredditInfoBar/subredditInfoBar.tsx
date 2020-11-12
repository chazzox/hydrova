import React from 'react';
import getProfileURL from '../../utils/imgQuerySplit';

import './subredditInfoBar.scss';

const subredditInfoBar = ({ infoBar }: { infoBar: AboutApiResponse }) => {
	return (
		<div id="subredditInfoBar">
			<img id="banner" style={{ height: '15px' }} src={getProfileURL(infoBar.data.banner_background_image)} />
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
