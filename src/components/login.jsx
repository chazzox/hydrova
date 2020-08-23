import React from 'react';

import '../styles/login.scss';
import Logo from '../assets/logo.svg'

class Login extends React.Component {
	render() {
		return (
			<div id="loginBox">
				<img src={Logo} id='logo' alt=""/>
			
				<div id="loginInfo">
					<h1>Hydrova</h1>
					<h2>High Performance Reddit Client</h2>
				</div>
				<a
					href={
						'https://www.reddit.com/api/v1/authorize?client_id=' +
						// these values will change based on the build currently used
						// we do this because the api secret is callback dependent, meaning that we need two different web app secrets to work with dev and production builds
						process.env.REACT_APP_REDDIT_ID +
						'&response_type=code&state=hgfjhgdf&redirect_uri=' +
						// these values will change based on the build currently used
						// we do this because the api secret is callback dependent, meaning that we need two different web app secrets to work with dev and production builds
						process.env.REACT_APP_CALLBACK_URL +
						'&duration=permanent&scope=read,identity,save'
					}
				>
					<div id="signIn">Sign In</div>
				</a>
				<a href='https://www.reddit.com/register'>
					<div id="signUp">
						Sign Up
					</div>
				</a>
			</div>
		);
	}
}

export default Login;
