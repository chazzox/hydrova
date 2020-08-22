import React from 'react';
import { connect } from 'react-redux';

import Modal from '../utils/modal';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { commentData: [], postData: {} };
		this.wrapperRef = React.createRef();
		this.setWrapperRef = this.setWrapperRef.bind(this);
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
			.then((json) => this.setState({ commentData: json[1].data.children, postData: json[0].data.children[0].data }))

			.catch((error) => console.log('error', error));
	}

	render() {
		console.log(this.state.postData);
		return (
			<Modal modalId="postModal">
				<div id="post" ref={this.wrapperRef}>
					<p>{this.props.post.permalink}</p>
					<div className="commentContainer">
						{this.state.commentData.map((parentComment, index) => (
							<Comment comment={parentComment} key={index} />
						))}
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
