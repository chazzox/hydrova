import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Listing from '../components/listing';

class Subreddit extends React.Component {
	constructor(props) {
        super(props);
        
		this.state = {
			subInfo: {}
		};
	}

	componentDidMount() {
		this.getSubredditInfo();
	}

	getSubredditInfo() {
		fetch('https://oauth.reddit.com' + this.props.location.pathname + '/about', {
			method: 'GET',
			headers: { Authorization: 'Bearer ' + this.props.auth.access_token },
			redirect: 'manual'
		})
			.then((response) => response.text())
			.then((text) => JSON.parse(text))
			.then((json) => {
				this.setState({ subInfo: json.data });
			})
			.catch((error) => console.log('error', error));
	}

	render() {
		return (
			<>
				{_.isEmpty(this.state.subInfo) ? null : (
					<div id="subredditBarThing" className="subredditHeader">
						<h1>{this.state.subInfo.display_name}</h1>
						<h2>{this.state.subInfo.public_description}</h2>
						<p>
							accounts online: {this.state.subInfo.accounts_active} | total members:{' '}
							{this.state.subInfo.subscribers}
						</p>
					</div>
				)}
				<Listing path={this.props.location.pathname} />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth.auth
	};
};

export default connect(mapStateToProps, null)(Subreddit);
