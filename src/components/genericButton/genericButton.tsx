import React from 'react';
import { NavLink } from 'react-router-dom';

import SVGS from '../../assets/icons/exportSVG';

import './genericButton.scss';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string;
	href?: string;
	clickEvent?: () => void;
	isSelected?: boolean;
	isVertical?: boolean;
	children?: JSX.Element;
}

const GenericButton = ({ svgPath, text, href, clickEvent, isSelected, isVertical, children }: propTypes) => {
	const Content = () => (
		<button
			onClick={clickEvent}
			className={`genericButton ${isVertical ? 'vertical' : ''}${isSelected ? 'selected' : ''}`}
		>
			{svgPath ? SVGS[svgPath] : null}
			{children}
			{text ? text : null}
		</button>
	);
	return (
		<>
			{href ? (
				<NavLink exact to={href} activeClassName="selected">
					<Content />
				</NavLink>
			) : (
				<Content />
			)}
		</>
	);
};

export default GenericButton;
