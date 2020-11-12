import React from 'react';
import { NavLink } from 'react-router-dom';

import SVGS from '../../assets/icons/exportSVG';

import './styles/generic.scss';
import './styles/compact.scss';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string | number;
	href?: string;
	clickEvent?: () => void;
	isSelected?: boolean;
	isCompact?: boolean;
	children?: JSX.Element;
}

const GenericButton = ({ svgPath, text, href, clickEvent, isCompact, isSelected, children }: propTypes) => {
	const Content = () => (
		<button
			onClick={clickEvent}
			className={`genericButton ${isCompact ? 'compactButton' : ''} ${text ? '' : 'noText'} ${
				isSelected ? 'selected' : ''
			}`}
		>
			{svgPath ? SVGS[svgPath] : null}
			{children}
			{text}
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
