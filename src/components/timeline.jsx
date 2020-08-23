import React from 'react';
import { connect } from 'react-redux';

import Post from './post';

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
		document.getElementById('root').addEventListener('scroll', this.calcScroll);
	}

	componentDidUnMount() {
		document.getElementById('root').removeEventListener('scroll', this.calcScroll);
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
		const rootScroll = document.getElementById('root').scrollTop;
		const rootHeight = document.getElementById('root').clientHeight;
		const heightThing = document.getElementById('timeline').clientHeight;
		const scrollPercent = Math.round((rootScroll / (heightThing - rootHeight)) * 100);
		if (scrollPercent === 100 && this.state.initialLoad && !this.state.scrollReached) {
			this.setState({ scrollReached: true });
			this.getBatches(this.props.auth.access_token, this.state.afterId, 15);
		} else if (this.state.initialLoad && scrollPercent < 100) {
			this.setState({ scrollReached: false });
		}
	}

	render() {
		return (
			<>
				<div id="timeline" onWheel={this.calcScroll}>
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
				// console.log(this.props.post);
				// console.log(this.props.post.gallery_data);
				return <p>this is a reddit collage</p>;
			}
		}
	}

	render() {
		return (
			<>
				<div className="post" onClick={() => this.setState({ postOpened: true })}>
					<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
					<p className="postTitle">{this.props.post.title}</p>
					{this.renderPost()}
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
