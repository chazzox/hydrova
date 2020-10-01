import React, { useState } from 'react';

const Submit = () => {
	const [postContentValue, setPostContentValue] = useState('');
	return (
		<div id="contentContainer">
			<div className="submitInputContainer">
				<input type="text" value={postContentValue} onChange={event => setPostContentValue(event.target.value)} />
			</div>
			<div className="markDownPreviewContainer"></div>
		</div>
	);
};

export default Submit;
