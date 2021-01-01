import React, { useState } from 'react';

const Submit = () => {
	const [newPostContent, setNewPostContent] = useState('');
	return (
		<div className="contentContainer">
			<div className="submitInputContainer">
				<input type="text" value={newPostContent} onChange={event => setNewPostContent(event.target.value)} />
			</div>
			<div className="markDownPreviewContainer"></div>
		</div>
	);
};

export default Submit;
