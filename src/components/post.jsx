import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import Modal from '../utils/modal';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { commentData: [], postSaved: false };
		this.wrapperRef = React.createRef();
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.saveButtonPress = this.saveButtonPress.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
		this.getComments(this.props.auth.access_token);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
			this.props.close();
		}
	}

	getComments(oauthAccessToken) {
		fetch(
			'https://oauth.reddit.com/' +
				this.props.post.subreddit_name_prefixed +
				'/comments/' +
				this.props.post.id +
				'?limit=1',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + oauthAccessToken },
				redirect: 'manual'
			}
		)
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => this.setState({ commentData: json[1].data.children }))

			.catch((error) => console.log('error', error));
	}

	saveButtonPress() {
		this.state.postSaved ? this.unSavePost(this.props.auth.access_token) : this.savePost(this.props.auth.access_token);
	}

	// the fetch function for save/unsave will be merged into a singular one

	savePost(oauthAccessToken) {
		fetch('https://oauth.reddit.com/api/save?id=t3_' + this.props.post.id, {
			method: 'POST',
			headers: { Authorization: 'Bearer ' + oauthAccessToken }
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (JSON.stringify(json) === JSON.stringify({})) this.setState({ postSaved: true });
			})
			.catch((error) => console.log('error', error));
	}

	unSavePost(oauthAccessToken) {
		fetch('https://oauth.reddit.com/api/unsave?id=t3_' + this.props.post.id, {
			method: 'POST',
			headers: { Authorization: 'Bearer ' + oauthAccessToken }
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (JSON.stringify(json) === JSON.stringify({})) this.setState({ postSaved: false });
			})
			.catch((error) => console.log('error', error));
	}

	render() {
		return (
			// probably not them best way to organize the dom elements, feel free to change
			<Modal modalId="postModalContainer">
				<div id="postModal" ref={this.wrapperRef}>
					<p>{this.props.post.permalink}</p>

					<div id="commentContainer">
						{this.state.commentData.map((parentComment, index) => (
							<Comment comment={parentComment} key={index} />
						))}
					</div>
					<div id="data">
						<button onClick={() => copy('https://www.reddit.com' + this.props.post.permalink)}>
							share (copy to clip board)
						</button>
						<button onClick={this.saveButtonPress}>{this.state.postSaved ? 'unsave' : 'save'}</button>
						<p>comments: {this.props.post.num_comments}</p>
					</div>
				</div>
			</Modal>
		);
	}
}

class Comment extends React.Component {
	render() {
		return <p>{this.props.comment.data.body}</p>;
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Post);
