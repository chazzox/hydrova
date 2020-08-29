import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import renderPost from '../utils/renderPost';
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

	componentDidMount() {
		this.getBatches(this.props.auth.access_token, '', 5, (json) => this.callbackFromFetch(json));
		document.getElementById('contentContainer').addEventListener('scroll', this.calcScroll);
	}

	componentWillUnmount() {
		document.getElementById('contentContainer').removeEventListener('scroll', this.calcScroll);
	}

	componentDidUpdate(prevProps) {
		if (this.props.path !== prevProps.path)
			this.setState(
				{ redditTimeline: [] },
				this.getBatches(this.props.auth.access_token, '', 5, (json) => this.callbackFromFetch(json))
			);
	}

	callbackFromFetch(json) {
		this.setState({ redditTimeline: this.state.redditTimeline.concat(json.data.children) });
		if (this.state.redditTimeline.length < 50)
			this.getBatches(this.props.auth.access_token, json.data.after, 15, (json) => this.callbackFromFetch(json));
		else this.setState({ afterId: json.data.after, initialLoad: true });
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

	render() {
		return (
			<Link id={this.props.post.id} to={{ pathname: '/post/' + this.props.post.id, state: { post: this.props.post } }}>
				<div className="post">
					<p>updoots: {this.props.post.ups + this.props.post.downs}</p>
					<p className="postTitle">{this.props.post.title}</p>
					{renderPost(this.props.post)}
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
