import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

import { refreshToken, generateToken, loggedOut } from './redux/store';

import Sidebar from './components/sidebar';
import Subreddit from './views/subreddit';
import Settings from './views/settings';
import Submit from './views/submit';
import Login from './views/login';
import Home from './views/home';
import User from './views/user';
import Post from './views/post';
import Mail from './views/mail';

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
									<Route path="/r/:subreddit" render={(props) => <Subreddit {...props} />} />
									<Route path="/post/:permalink" render={(props) => <Post {...props} />} />
									<Route path="/u/:user" render={(props) => <User {...props} />} />
									<Route path="/settings" render={() => <Settings />} />
									<Route path="/submit" render={() => <Submit />} />
									<Route path="/mail" render={() => <Mail />} />
									<Route path="/" render={() => <Home />} />
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
