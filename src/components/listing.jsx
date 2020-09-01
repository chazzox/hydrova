import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import renderPost from '../utils/renderPost';
import getBatches from '../utils/getTimeline';
import '../styles/timeline.scss';

class Listing extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listingArray: [],
			afterId: '',
			initialLoad: false,
			scrollReached: false
		};
		this.hasReachedScroll = this.hasReachedScroll.bind(this);
	}

	componentDidMount() {
		getBatches(this.props.auth.access_token, '', 5, (json) => this.callbackFromFetch(json), this.props.path);
		document.getElementById('contentContainer').addEventListener('scroll', this.hasReachedScroll);
		document.getElementById('contentContainer').addEventListener('resize', this.hasReachedScroll);
	}

	componentWillUnmount() {
		document.getElementById('contentContainer').addEventListener('scroll', this.hasReachedScroll);
		document.getElementById('contentContainer').addEventListener('resize', this.hasReachedScroll);
	}

	componentDidUpdate(prevProps) {
		if (this.props.path !== prevProps.path)
			this.setState(
				{ listingArray: [] },
				getBatches(this.props.auth.access_token, '', 5, (json) => this.callbackFromFetch(json), this.props.path)
			);
	}

	callbackFromFetch(json) {
		this.setState({ listingArray: this.state.listingArray.concat(json.data.children) });
		this.state.listingArray.length < 50
			? getBatches(
					this.props.auth.access_token,
					json.data.after,
					15,
					(json) => this.callbackFromFetch(json),
					this.props.path
			  )
			: this.setState({ afterId: json.data.after, initialLoad: true });
	}

	hasReachedScroll() {
		if (document.getElementById('contentContainer') !== null) {
			const rootScroll = document.getElementById('contentContainer').scrollTop;
			const rootHeight = document.getElementById('contentContainer').clientHeight;
			const heightThing = document.getElementById('timeline').clientHeight;
			const scrollPercent = Math.round((rootScroll / (heightThing - rootHeight)) * 100);
			if (scrollPercent === 85 && this.state.initialLoad && !this.state.scrollReached) {
				this.setState({ scrollReached: true });
				getBatches(
					this.props.auth.access_token,
					this.state.afterId,
					15,
					(json) => {
						this.setState({
							listingArray: this.state.listingArray.concat(json.data.children),
							afterId: json.data.after
						});
					},
					this.props.path
				);
			} else if (this.state.initialLoad && scrollPercent < 85) this.setState({ scrollReached: false });
		}
	}

	render() {
		return (
			<>
				<div className="contentInnerContainer" id="timeline">
					{this.state.listingArray === []
						? null
						: this.state.listingArray.map((item, index) => (
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
			<Link to={{ pathname: '/post/' + this.props.post.id, state: { post: this.props.post } }}>
				<div id={this.props.post.id} className="post">
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
