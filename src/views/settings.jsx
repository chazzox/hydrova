import React from 'react';

class Settings extends React.Component {
	componentDidMount() {
		document.getElementById('navSettings').classList.add('selected');
	}
	componentWillUnmount() {
		document.getElementById('navSettings').classList.remove('selected');
	}
	render() {
		return 'this is settings component';
	}
}

export default Settings;
