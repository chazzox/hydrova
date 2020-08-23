import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';

import Modal from '../utils/modal';

import '../styles/post.scss';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { commentData: [], postSaved: false };
		this.wrapperRef = React.createRef();
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.saveButtonPress = this.saveButtonPress.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	// not sure what this function does, its a classic stack overflow copy paste
	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	// adding/removing the event listener needed for modal functionality, also loading the comments when the post is clicked
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
				'?limit=5',
			{
				method: 'GET',
				headers: { Authorization: 'Bearer ' + oauthAccessToken },
				redirect: 'manual'
			}
		)
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			// settings the comment data to the component state
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

	renderPost() {
		// switching through different posts types, support for mp4, cross posts, edits and collages coming soon
		if (this.props.post.is_self) return <p className="postContent">{this.props.post.selftext}</p>;
		else if (this.props.post.is_video) {
			return (
				<video controls={true}>
					<source src={this.props.post.media.reddit_video.fallback_url} type="video/mp4" />
				</video>
			);
		} else {
			if (this.props.post.post_hint === 'link') return <p>this is a link, support will be added soon</p>;
			else if (this.props.post.post_hint === 'image') return <img src={this.props.post.url} alt="" />;
			else {
				return <p>this is a reddit collage</p>;
			}
		}
	}

	render() {
		return (
			<Modal modalId="postModalContainer">
				<div id="postModal" ref={this.wrapperRef}>
					<div className="post" onClick={() => this.setState({ postOpened: true })}>
						<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
						<p className="postTitle">{this.props.post.title}</p>
						{this.renderPost()}
						<p className="postInfo">
							{this.props.post['subreddit_name_prefixed']} | u/{this.props.post.author}
						</p>
					</div>

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
