import React from 'react';

import Listing from '../components/listing';

class Main extends React.Component {
	componentDidMount() {
		document.getElementById('navTimeline').classList.add('selected');
	}

	componentWillUnmount() {
		document.getElementById('navTimeline').classList.remove('selected');
	}

	render() {
		return (
			<>
				<div id="contentContainer">
					<div>sortBy</div>
					<Listing path="best" />
				</div>
			</>
		);
	}
}

export default Main;
