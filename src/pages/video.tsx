import React from 'react';
import ReactHlsPlayer from 'react-hls-player';

import 'styles/redirect.scss';

const Video: React.FC = () => {
	return (
		<ReactHlsPlayer
			crossOrigin="anonymous"
			url="https://v.redd.it/nd2rkgfs0k961/HLSPlaylist.m3u8"
			autoplay={false}
			controls={true}
			width={500}
			height={375}
		/>
	);
};

export default Video;
