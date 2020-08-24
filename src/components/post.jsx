import React from 'react';
import copy from 'copy-to-clipboard';
import { connect } from 'react-redux';
import _ from 'lodash';

import '../styles/post.scss';
import { Link } from 'react-router-dom';

class Post extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.likes);
		this.state = {
			commentData: [],
			postSaved: false,
			postData: this.props.location.state !== undefined ? { ...this.props.location.state.post } : {},
			voteDirection: 0
		};
		this.saveButtonPress = this.saveButtonPress.bind(this);
	}

	// adding/removing the event listener needed for modal functionality, also loading the comments when the post is clicked
	componentDidMount() {
		console.log(this.state.postData);
		if (_.isEmpty(this.state.postData)) {
			this.getPost(
				'https://oauth.reddit.com/comments/' + this.props.match.params.permalink,
				this.props.auth.access_token,
				(json) => {
					console.log(json);
					this.setState({
						postData: json[0].data.children[0].data,
						commentData: this.state.commentData.concat(json[1].data.children)
					});
				}
			);
		} else {
			this.getPost(
				'https://oauth.reddit.com/comments/' + this.props.match.params.permalink,
				this.props.auth.access_token,
				(json) => {
					console.log(json);
					this.setState({
						commentData: this.state.commentData.concat(json[1].data.children)
					});
				}
			);
		}
	}

	getPost(apiPath, oauthAccessToken, handleResult) {
		fetch(apiPath, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then(handleResult)
			.catch((error) => console.log('error', error));
	}

	saveButtonPress() {
		const apiPath = this.state.postSaved ? 'unsave' : 'save';
		fetch('https://oauth.reddit.com/api/' + apiPath + '?id=t3_' + this.state.postData.id, {
			method: 'POST',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token }
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (JSON.stringify(json) === JSON.stringify({})) this.setState({ postSaved: !this.state.postSaved });
			})
			.catch((error) => console.log('error', error));
	}

	renderPost() {
		// switching through different posts types, support for mp4, cross posts, edits and collages coming soon
		if (this.state.postData.is_self) return <p className="postContent">{this.state.postData.selftext}</p>;
		else if (this.state.postData.is_video) {
			return (
				<video controls={true}>
					<source src={this.state.postData.media.reddit_video.fallback_url} type="video/mp4" />
				</video>
			);
		} else {
			if (this.state.postData.post_hint === 'link') return <p>this is a link, support will be added soon</p>;
			else if (this.state.postData.post_hint === 'image') return <img src={this.state.postData.url} alt="" />;
			else {
				return <p>this is a reddit collage</p>;
			}
		}
	}

	render() {
		return (
			<div className="contentInnerContainer">
				<div className="post" onClick={() => this.setState({ postOpened: true })}>
					<Link to="/">back</Link>
					<p>updoots: {this.state.postData.ups + this.state.postData.downs}</p>
					<p className="postTitle">{this.state.postData.title}</p>
					{this.renderPost()}
					<p className="postInfo">
						{this.state.postData['subreddit_name_prefixed']} | u/{this.state.postData.author}
					</p>
					<div id="data">
						<button onClick={() => copy('https://www.reddit.com' + this.state.postData.permalink)}>
							share (copy to clip board)
						</button>
						<button onClick={this.saveButtonPress}>{this.state.postSaved ? 'unsave' : 'save'}</button>
						<p>comments: {this.state.postData.num_comments}</p>
					</div>
				</div>
				<div className="commentContainer">
					{this.state.commentData.map((parentComment, index) => (
						<Comment comment={parentComment} key={index} />
					))}
				</div>
			</div>
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
