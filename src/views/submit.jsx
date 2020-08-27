import React from 'react';

class Submit extends React.Component {
	componentDidMount() {
		document.getElementById('navPost').classList.add('selected');
	}
	componentWillUnmount() {
		document.getElementById('navPost').classList.remove('selected');
	}
	render() {
		return 'this is a submit form';
	}
}

export default Submit;
