import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { refreshToken, generateToken, loggedOut } from './redux/store';

import Navbar from './components/navbar';
import Login from './components/login';
import Reddit from './components/timeline';

const callbackRegex = /^state=([\w-]*)&code=([\w-]*)$/;

class App extends React.Component {
	componentDidMount() {
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
						<div id="container">
							<Navbar />
							<Reddit />
						</div>
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
