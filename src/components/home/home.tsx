import React, { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		document.getElementById('navTimeline')?.classList.toggle('selected');
		return () => {
			document.getElementById('navTimeline')?.classList.toggle('selected');
		};
	});
	return <div id="contentContainer">lmao</div>;
}
