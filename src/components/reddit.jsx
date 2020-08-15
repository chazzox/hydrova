import React from 'react';

export default class Reddit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redditTimeline: []
		};
	}

	componentDidMount() {
		this.getRedditFeed(this.props.userAuth);
	}

	getRedditFeed(oauthAccessToken) {
		fetch('https://oauth.reddit.com/best', {
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
						: this.state.redditTimeline.map((item, index) => <RedditPost post={item.data} key={index} />)}
				</div>
			</>
		);
	}
}

class RedditPost extends React.Component {
	renderPost(postType) {
		switch (postType) {
			case 'image':
				return <img src={this.props.post.url} alt="" />;
			case 'self':
				return <p className="postContent">{this.props.post.selftext}</p>;
			case 'link':
				return <p>this is a link, support will be added soon</p>;
			case 'hosted:video':
				return <p>this is a video, support will be added soon</p>;
			case undefined:
				return <p>uhhhhhhhhhhhhhhhhhh</p>;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="post">
				<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
				<p className="postTitle">{this.props.post.title}</p>
				{this.renderPost(this.props.post.post_hint)}
				<p className="postInfo">
					{this.props.post['subreddit_name_prefixed']} | u/{this.props.post.author}
				</p>
			</div>
		);
	}
}
