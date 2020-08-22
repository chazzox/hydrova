import React from 'react';
import { connect } from 'react-redux';

import Post from './post';

class Reddit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redditTimeline: []
		};
	}

	componentDidMount() {
		// once the component is rendered we will fetch the timeline (this means if we switch views then the feed will be auto refreshed)
		this.getRedditFeed(this.props.auth.access_token);
	}

	// fetching the best timeline feed
	getRedditFeed(oauthAccessToken) {
		fetch('https://oauth.reddit.com/best?limit=40', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((json) => {
				this.setState({ redditTimeline: JSON.parse(json).data.children });
			})
			.catch((error) => console.log('error', error));
	}

	render() {
		return (
			<>
				<div id="timeline">
					{this.state.redditTimeline === []
						? null
						: this.state.redditTimeline.map((item, index) => (
								<RedditPost Bearer={this.props.userAuth} post={item.data} key={index} />
						  ))}
				</div>
			</>
		);
	}
}

class RedditPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = { postOpened: false };
	}

	// needs to be refactors as it turns out that is_self and is_reddit_video are options to test the type
	renderPost(postType) {
		// switching through different posts types, support for mp4, cross posts, edits and collages coming soon
		switch (postType) {
			case 'image':
				return <img src={this.props.post.url} alt="" />;
			case 'self':
				return <p className="postContent">{this.props.post.selftext}</p>;
			case 'link':
				return <p>this is a link, support will be added soon</p>;
			case 'hosted:video':
				return <>video</>;
			case undefined:
				return <p>this post type is currently confused</p>;
			default:
				break;
		}
	}

	render() {
		return (
			<>
				<div className="post" onClick={() => this.setState({ postOpened: true })}>
					<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
					<p className="postTitle">{this.props.post.title}</p>
					{this.renderPost(this.props.post.post_hint)}
					<p className="postInfo">
						{this.props.post['subreddit_name_prefixed']} | u/{this.props.post.author}
					</p>
				</div>
				{this.state.postOpened ? (
					<Post close={() => this.setState({ postOpened: false })} post={this.props.post} />
				) : null}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Reddit);
