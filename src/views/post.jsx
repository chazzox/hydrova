import React from 'react';
import ReactCommonmark from 'react-commonmark';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import _ from 'lodash';

import '../styles/post.scss';

class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentData: [],
			postSaved: false,
			...(this.props.location.state !== undefined
				? {
						postData: { ...this.props.location.state.post },
						voteDirection: this.props.state.post.likes
				  }
				: { postData: {}, voteDirection: null })
		};
		this.saveButtonPress = this.saveButtonPress.bind(this);
	}

	componentDidMount() {
		document.getElementById('navPost').classList.add('selected');
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

	componentWillUnmount() {
		document.getElementById('navPost').classList.remove('selected');
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

	renderPost() {
		// switching through different posts types, support for mp4, cross posts, edits and collages coming soon
		if (this.state.postData.is_self) return <ReactCommonmark source={this.state.postData.selftext} />;
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
					<button onClick={() => this.props.history.goBack()}>back</button>
					<button
						className="button"
						style={this.state.voteDirection === true ? { backgroundColor: 'white' } : null}
						onClick={() => this.vote(this.state.postData.name, this.state.voteDirection === true ? 0 : 1)}
					>
						updoot
					</button>
					<button
						className="button"
						style={this.state.voteDirection === false ? { backgroundColor: 'red' } : null}
						onClick={() => this.vote(this.state.postData.name, this.state.voteDirection === false ? 0 : -1)}
					>
						downdoot
					</button>
					<p>updoots: {this.state.postData.ups + this.state.postData.downs}</p>
					<p className="postTitle">{this.state.postData.title}</p>
					{this.renderPost()}
					<p className="postInfo">
						{this.state.postData.subreddit_name_prefixed} | u/{this.state.postData.author}
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
					{this.state.commentData.map((parentComment, index) => {
						if (parentComment.kind === 't1') return <Comment comment={parentComment} key={index} />;
					})}
				</div>
			</div>
		);
	}
}

class Comment extends React.Component {
	render() {
		return <ReactCommonmark source={this.props.comment.data.body} />;
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Post);
