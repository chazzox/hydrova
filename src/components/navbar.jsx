import React from 'react';

class Navbar extends React.Component {
	render() {
		return (
			<div id="navbar">
				<h1 href="" id="navTitle">reddit</h1>
				<input type="text" id="searchBar" placeholder="search" />
				<div id="navRight">
					<button className="navButton">New Post</button>
					<button className="navButton">Mail</button>
					<button className="navButton">THE_PINPAL614</button>
				</div>
			</div>
		);
	}
}

export default Navbar;
