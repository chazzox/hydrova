import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/timeline.scss';

class Reddit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			redditTimeline: [],
			afterId: '',
			initialLoad: false,
			scrollReached: false
		};
		this.calcScroll = this.calcScroll.bind(this);
	}

	componentDidMount() {
		// once the component is rendered we will fetch the timeline (this means if we switch views then the feed will be auto refreshed)
		this.getInitialFeed(this.props.auth.access_token);
		document.getElementById('root').addEventListener('scroll', this.calcScroll, false);
	}

	componentWillUnmount() {
		document.getElementById('root').removeEventListener('scroll', this.calcScroll, false);
	}

	getInitialFeed(oauthAccessToken, afterId) {
		fetch('https://oauth.reddit.com/best?limit=5&after=' + afterId, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				this.setState({ redditTimeline: this.state.redditTimeline.concat(json.data.children) });
				if (this.state.redditTimeline.length < 50)
					this.getInitialFeed(this.props.auth.access_token, json.data.after);
				else this.setState({ afterId: json.data.after, initialLoad: true });
			})
			.catch((error) => console.log('error', error));
	}

	getBatches(oauthAccessToken, afterId, batchCount) {
		fetch('https://oauth.reddit.com/best?limit=' + batchCount + '&after=' + afterId, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				this.setState({
					redditTimeline: this.state.redditTimeline.concat(json.data.children),
					afterId: json.data.after
				});
			})
			.catch((error) => console.log('error', error));
	}

	calcScroll() {
		// jank solution, but fixed bug, this function needs to be rewritten at some point and more research is needed
		if (document.getElementById('timeline') !== null) {
			const rootScroll = document.getElementById('root').scrollTop;
			const rootHeight = document.getElementById('root').clientHeight;
			const heightThing = document.getElementById('timeline').clientHeight;
			const scrollPercent = Math.round((rootScroll / (heightThing - rootHeight)) * 100);
			// loading new posts if bottom of page is reached
			if (scrollPercent === 100 && this.state.initialLoad && !this.state.scrollReached) {
				this.setState({ scrollReached: true });
				this.getBatches(this.props.auth.access_token, this.state.afterId, 15);
			} else if (this.state.initialLoad && scrollPercent < 100) {
				this.setState({ scrollReached: false });
			}
		}
	}

	render() {
		return (
			<>
				<div className="contentInnerContainer" id="timeline">
					{this.state.redditTimeline === []
						? null
						: this.state.redditTimeline.map((item, index) => (
								<RedditPost Bearer={this.props.userAuth} post={item.data} key={index} />
						  ))}
					{/* you can maybe put a spacer div here and have some sort of loading element to tell the user that more posts are coming */}
				</div>
			</>
		);
	}
}

class RedditPost extends React.Component {
	// needs to be refactors as it turns out that is_self and is_reddit_video are options to test the type
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
			<Link id={this.props.post.id} to={{ pathname: '/post/' + this.props.post.id, state: { post: this.props.post } }}>
				<div className="post">
					<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
					<p className="postTitle">{this.props.post.title}</p>
					{this.renderPost()}
					<p className="postInfo">
						{this.props.post['subreddit_name_prefixed']} | u/{this.props.post.author}
						<br />
						comments: {this.props.post.num_comments}
					</p>
				</div>
			</Link>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Reddit);
