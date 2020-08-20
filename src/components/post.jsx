import React from 'react';

import Modal from '../utils/modal';

class Post extends React.Component {
	getComments(oauthAccessToken) {
		fetch('https://oauth.reddit.com/' + this.props.post.subreddit_name_prefixed + '/comments/' + this.props.post.id, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((json) => console.log(json))
			.catch((error) => console.log('error', error));
	}

	render() {
		return (
			<Modal modalId="postModal">
				<div id="modalContainer" onClick={() => this.props.close()}>
					<div id="postContent">
						<p>{this.props.postUrl}</p>
					</div>
				</div>
			</Modal>
		);
	}
}

export default Post;
