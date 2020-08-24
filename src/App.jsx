import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import { refreshToken, generateToken, loggedOut } from './redux/store';

import Sidebar from './components/sidebar';
import Login from './components/login';
import Timeline from './components/timeline';
import Post from './components/post';

const callbackRegex = /^state=([\w-]*)&code=([\w-]*)#\/$/;

class App extends React.Component {
	// detecting if user is logged in
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
								<Switch>
									<Route path="/post/:permalink" render={(props) => <Post {...props} />} />
									<Route path="/" render={() => <Timeline />} />
								</Switch>
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

// function to connect the component to the global data store (you'll see this a lot)
const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		isLoaded: state.auth.isLoaded,
		auth: state.auth.auth
	};
};

// actually connect the component using the function
export default connect(mapStateToProps, null)(App);
