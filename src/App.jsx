import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { refreshToken, generateToken, loggedOut } from './redux/store';

import Sidebar from './components/sidebar';
import Login from './components/login';
import Timeline from './components/timeline';

const callbackRegex = /^state=([\w-]*)&code=([\w-]*)$/;

class App extends React.Component {
	componentDidMount() {
		document.getElementById('html').classList = 'darkMode';
		if (Cookies.getJSON('redditOauth') !== undefined) {
			this.props.dispatch(refreshToken());
		} else if (callbackRegex.test(document.location.href.split('?')[1])) {
			this.props.dispatch(generateToken());
		} else {
			console.log(Cookies.getJSON('redditOauth'));
			this.props.dispatch(loggedOut());
		}
	}
	render() {
		return (
			<>
				{this.props.isLoaded ? (
					this.props.isLoggedIn ? (
						<>
							<Sidebar />
							<div id="contentContainer">
								<Timeline />
							</div>
						</>
					) : (
						<Login />
					)
				) : null}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		isLoaded: state.auth.isLoaded,
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(App);
