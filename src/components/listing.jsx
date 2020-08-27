import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../styles/timeline.scss';

class Listing extends React.Component {
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

	test(json) {
		this.setState({ redditTimeline: this.state.redditTimeline.concat(json.data.children) });
		if (this.state.redditTimeline.length < 50)
			this.getBatches(this.props.auth.access_token, json.data.after, 15, (json) => this.test(json));
		else this.setState({ afterId: json.data.after, initialLoad: true });
	}

	componentDidMount() {
		this.getBatches(this.props.auth.access_token, '', 5, (json) => this.test(json));
		// document.getElementById('contentContainer').addEventListener('scroll', this.calcScroll);
	}

	componentWillUnmount() {
		// document.getElementById('contentContainer').removeEventListener('scroll', this.calcScroll);
	}

	getBatches(oauthAccessToken, afterId, batchCount, updateFunction) {
		fetch('https://oauth.reddit.com/' + this.props.path + '/?limit=' + batchCount + '&after=' + afterId, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + oauthAccessToken },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then(updateFunction)
			.catch((error) => console.log('error', error));
	}

	calcScroll() {
		if (document.getElementById('contentContainer') !== null) {
			const rootScroll = document.getElementById('contentContainer').scrollTop;
			const rootHeight = document.getElementById('contentContainer').clientHeight;
			const heightThing = document.getElementById('timeline').clientHeight;
			const scrollPercent = Math.round((rootScroll / (heightThing - rootHeight)) * 100);
			// loading new posts if bottom of page is reached
			if (scrollPercent === 85 && this.state.initialLoad && !this.state.scrollReached) {
				this.setState({ scrollReached: true });
				this.getBatches(this.props.auth.access_token, this.state.afterId, 15, (json) => {
					this.setState({
						redditTimeline: this.state.redditTimeline.concat(json.data.children),
						afterId: json.data.after
					});
				});
			} else if (this.state.initialLoad && scrollPercent < 85) {
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
				</div>
			</>
		);
	}
}

class RedditPost extends React.Component {
	htmlToElements(html) {
		var template = document.createElement('template');
		template.innerHTML = html;
		return template.content.childNodes;
	}

	// needs to be refactors as it turns out that is_self and is_reddit_video are options to test the type
	renderPost() {
		// switching through different posts types, support for mp4, cross posts, edits and collages coming soon
		if (this.props.post.is_self)
			return (
				<div
					className="postContent"
					dangerouslySetInnerHTML={{
						__html: new DOMParser().parseFromString(this.props.post.selftext_html, 'text/html').documentElement
							.textContent
					}}
				/>
			);
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

export default connect(mapStateToProps, null)(Listing);
