import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import Logo from '../assets/logo.svg';

import searchIcon from '../assets/sidebar/search.svg';
import homeIcon from '../assets/sidebar/home.svg';
import newIcon from '../assets/sidebar/new.svg';
import mailIcon from '../assets/sidebar/mail.svg';
import settingsIcon from '../assets/sidebar/settings.svg';

import '../styles/sidebar.scss';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {},
			multiredditInfo: [],
			subscribed: [],
			subredditsLoaded: false
		};
	}

	componentDidMount() {
		this.getUserInfo();
		this.getSubreddits();
	}

	getUserInfo() {
		fetch('https://oauth.reddit.com/api/v1/me', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			// parsing the promise information
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					this.setState({ userInfo: json });
				} else {
					console.log(json);
				}
			})
			.catch((error) => console.log(error));
		fetch('https://oauth.reddit.com/api/multi/mine', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			// parsing the promise information
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					this.setState({ multiredditInfo: json });
				} else {
					console.log(json);
				}
			})
			.catch((error) => console.log(error));
	}

	getSubreddits(afterId) {
		fetch('https://oauth.reddit.com/subreddits/mine/subscriber?limit=15&after=' + afterId, {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				if (json.error === undefined) {
					this.setState({ subscribed: this.state.subscribed.concat(json.data.children) });
					if (json.data.after) this.getSubreddits(json.data.after);
					else {
						this.setState({
							subredditsLoaded: true,
							subscribed: this.state.subscribed.sort((a, b) => a.data.url.localeCompare(b.data.url))
						});
					}
				} else {
					console.log(json);
				}
			})
			.catch((error) => console.log(error));
	}

	getProfileImageUrl() {
		if (this.state.userInfo.icon_img === undefined) return '';
		else return this.state.userInfo.icon_img.split('?')[0];
	}

	render() {
		return (
			<>
				<div id="sidebar">
					<img src={Logo} id="logo" alt="" />
					<h1 href="" id="navTitle">
						Hydrova
					</h1>
					<input
						className="navButton hasIcon"
						type="text"
						id="searchBar"
						placeholder="Search"
						style={{ backgroundImage: `url(${searchIcon})` }}
					/>
					<SidebarLink pathname="/" icon={homeIcon} displayName="Timeline" />
					<SidebarLink pathname="/submit" icon={newIcon} displayName="Post" />
					<SidebarLink pathname="/mail" icon={mailIcon} displayName="Mail" />
					<SidebarLink pathname="/settings" icon={settingsIcon} displayName="Settings" />

					<div className="scrollSection">
						<h3>Feeds</h3>
						<Link to="/r/all">
							<button className="navButton">All</button>
						</Link>
						{this.state.multiredditInfo.map((multiReddit, index) => (
							<SidebarLink
								key={index}
								pathname={'/m/' + multiReddit.data.display_name}
								displayName={multiReddit.data.display_name}
							/>
						))}
						{this.state.subredditsLoaded ? (
							<>
								<h3>My Subreddits</h3>
								{this.state.subscribed.map((subreddit, index) => {
									console.log();
									if (subreddit.data.subreddit_type !== 'user')
										return (
											<SidebarLink
												key={index}
												pathname={'/r/' + subreddit.data.display_name}
												displayName={subreddit.data.display_name}
											>
												<div
													className="icon"
													style={
														_.isEmpty(subreddit.data.icon_img)
															? { backgroundColor: `rgb(234,64,12)` }
															: { backgroundImage: `url(${subreddit.data.icon_img})` }
													}
												></div>
											</SidebarLink>
										);
								})}
							</>
						) : null}
					</div>
					<div id="userDetails">
						<div id="userText">
							<p id="userName">{this.state.userInfo.name}</p>
							<p id="userKarma">{this.state.userInfo.total_karma}</p>
						</div>
						<div id="profileImage" style={{ backgroundImage: `url(${this.getProfileImageUrl()})` }} />
					</div>
				</div>
			</>
		);
	}
}

class SidebarLink extends React.Component {
	render() {
		return (
			<Link to={this.props.pathname}>
				<button
					id={'nav' + this.props.displayName}
					className="navButton hasIcon"
					style={this.props.icon ? { backgroundImage: `url(${this.props.icon})` } : null}
				>
					{this.props.displayName}
					{this.props.children}
				</button>
			</Link>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default withRouter(connect(mapStateToProps, null)(Sidebar));
