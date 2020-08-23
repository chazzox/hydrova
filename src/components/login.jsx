import React from 'react';

import '../styles/signedOut.scss';

class Login extends React.Component {
	render() {
		return (
			<div id="signedOut">
				<div id="signUp">
					<p>Haven't used reddit before?</p>
					<p>Click on the button below to sign up now! </p>
					<a href={'https://www.reddit.com/register'}>sign up for reddit</a>
				</div>
				<div id="login">
					<p>Welcome!</p>
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
						login to reddit
					</a>
				</div>
			</div>
		);
	}
}

export default Login;
