import React from 'react';
import ReactDOM from 'react-dom';

// this is the component we wrap all of our modals in
export default class Modal extends React.Component {
	constructor(props) {
		super(props);
		// this is what we're wrapping our modal inside
		this.el = document.createElement('span');
		this.state = {
			// this is where we're are putting the modal
			popupRoute: document.getElementById('modal'),
			// this element behind the thing we're wrapping it in
			appRoute: document.getElementById('root')
		};
	}
	componentDidMount() {
		// adding the blur effect to the background
		this.state.appRoute.classList.add('MODAL_OPEN_CLASS');
		this.state.popupRoute.appendChild(this.el);
		this.el.classList.add('modalWrapper');
		this.el.id = this.props.modalId;
	}

	componentWillUnmount() {
		// removing the blur
		this.state.appRoute.classList.remove('MODAL_OPEN_CLASS');
		// removing the inner DOM content
		this.state.popupRoute.removeChild(this.el);
	}

	render() {
		// adding the modal contents into the container DOM
		return ReactDOM.createPortal(<>{this.props.children}</>, this.el);
	}
}
