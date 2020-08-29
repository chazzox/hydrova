import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import _ from 'lodash';

import renderPost from '../utils/renderPost';
import '../styles/post.scss';
import '../styles/postButtonMenu.scss';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentData: [],
			postSaved: false,
			...(this.props.location.state !== undefined
				? {
						postData: { ...this.props.location.state.post },
						voteDirection: this.props.location.state.post.likes
				  }
				: { postData: {}, voteDirection: null })
		};
		this.saveButtonPress = this.saveButtonPress.bind(this);
	}

	componentDidMount() {
		if (_.isEmpty(this.state.postData)) {
			this.getPost('https://oauth.reddit.com/comments/' + this.props.match.params.permalink, (json) => {
				this.setState({
					commentData: this.state.commentData.concat(json[1].data.children),
					postData: json[0].data.children[0].data,
					voteDirection: json[0].data.children[0].data.likes
				});
			});
		} else {
			this.getPost('https://oauth.reddit.com/comments/' + this.props.match.params.permalink, (json) => {
				this.setState({
					commentData: this.state.commentData.concat(json[1].data.children)
				});
			});
		}
	}

	vote(postId, voteDirection) {
		const directions = [false, null, true];
		fetch('https://oauth.reddit.com/api/vote?id=' + postId + '&dir=' + voteDirection, {
			method: 'POST',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (_.isEmpty(json)) this.setState({ voteDirection: directions[voteDirection + 1] });
			})
			.catch((error) => console.log('error', error));
	}

	getPost(apiPath, handleResult) {
		fetch(apiPath, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
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

	render() {
		return (
			<>
				<div id="postButtonMenu">
					<button onClick={() => this.props.history.goBack()}>Back</button>
					<button
						className="button"
						style={this.state.voteDirection === true ? { backgroundColor: 'white' } : null}
						onClick={() => this.vote(this.state.postData.name, this.state.voteDirection === true ? 0 : 1)}
					>
						Upvote
					</button>
					<button
						className="button"
						style={this.state.voteDirection === false ? { backgroundColor: 'red' } : null}
						onClick={() => this.vote(this.state.postData.name, this.state.voteDirection === false ? 0 : -1)}
					>
						Downvote
					</button>
					<button onClick={() => copy('https://www.reddit.com' + this.state.postData.permalink)}>Share</button>
					<button onClick={this.saveButtonPress}>{this.state.postSaved ? 'Unsave' : 'Save'}</button>
					<button>{this.state.postData.num_comments}</button>
					<button>{this.state.postData.ups}</button>
				</div>
				<div id="contentContainer">
					<div className="contentInnerContainer">
						<div className="post" onClick={() => this.setState({ postOpened: true })}>
							<p className="postTitle">{this.state.postData.title}</p>
							{renderPost(this.state.postData)}
							<p className="postInfo">
								{this.state.postData.subreddit_name_prefixed} | u/{this.state.postData.author}
							</p>
						</div>
						<div className="commentContainer">
							{this.state.commentData.map((parentComment, index) => {
								if (parentComment.kind === 't1') return <Comment comment={parentComment} key={index} />;
							})}
						</div>
					</div>
				</div>
			</>
		);
	}
}

class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<div
					className="commentBody"
					dangerouslySetInnerHTML={{
						__html: new DOMParser().parseFromString(this.props.comment.data.body_html, 'text/html')
							.documentElement.textContent
					}}
				/>
				{this.props.comment.data.replies
					? this.props.comment.data.replies.data.children.map((childComments, index) => {
							if (childComments.kind === 't1') return <Comment comment={childComments} key={index} />;
					  })
					: null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Post);
