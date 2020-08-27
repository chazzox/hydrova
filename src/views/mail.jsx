import React from 'react';

class Settings extends React.Component {
	componentDidMount() {
		document.getElementById('navMail').classList.add('selected');
	}
	componentWillUnmount() {
		document.getElementById('navMail').classList.remove('selected');
	}
	render() {
		return 'this is mail component';
	}
}

export default Settings;
