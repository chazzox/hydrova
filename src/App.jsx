import React from 'react';
import { connect } from 'react-redux';

import { refreshToken, generateToken } from './redux/store';

import Navbar from './components/navbar';
import Login from './components/login';
import Reddit from './components/reddit';

class App extends React.Component {
	render() {
		return (
			<>
				{/* only rendering the timeline if the logged in boolean is set to true */}
				{this.props.isLoggedIn ? (
					<div id="container">
						<Navbar />
						<Reddit userAuth={this.props.oauthInfo.access_token} />
					</div>
				) : (
					<Login />
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.auth.isLoggedIn,
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps)(App);
