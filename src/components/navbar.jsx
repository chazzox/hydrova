import React from 'react';
import { connect } from 'react-redux';
class Navbar extends React.Component {
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
	render() {
		return (
			<div id="navbar">
				<h1 href="" id="navTitle">
					reddit
				</h1>
				<input type="text" id="searchBar" placeholder="search" />
				<div id="navRight">
					<button className="navButton">New Post</button>
					<button className="navButton">Mail</button>
					<button className="navButton">{this.state.userInfo.name}</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Navbar);
