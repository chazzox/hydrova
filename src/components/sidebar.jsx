import React from 'react';
import { connect } from 'react-redux';

import Logo from '../assets/logo.svg';
import '../styles/sidebar.scss';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: {}
		};
	}

	componentDidMount() {
		this.getUserInfo();
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
	}

	getProfileImageUrl() {
		if (this.state.userInfo.icon_img === undefined) return '';
		else return this.state.userInfo.icon_img.split('?')[0];
	}

	render() {
		console.log(this.state.userInfo);
		return (
			<>
				<div id="sidebar">
					<img src={Logo} id="logo" alt="" />
					<h1 href="" id="navTitle">
						Hydrova
					</h1>
					<input type="text" id="searchBar" placeholder="search" />
					<div id="navRight">
						<button className="navButton">New Post</button>
						<button className="navButton">Mail</button>
						<div id="userDetails">
							<p id="userName">{this.state.userInfo.name}</p>
							<p id="userKarma">{this.state.userInfo.total_karma}</p>
							<div id="profileImage" style={{ backgroundImage: `url(${this.getProfileImageUrl()})` }} />
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Sidebar);
