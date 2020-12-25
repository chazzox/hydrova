import React from 'react';
import { NavLink } from 'react-router-dom';

import SVGS from 'assets/icons/exportSVG';

import 'styles/component/button/generic.scss';
import 'styles/component/button/compact.scss';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string | number;
	href?: string;
	clickEvent?: () => void;
	isSelected?: boolean;
	isCompact?: boolean;
	isRound?: boolean;
	children?: JSX.Element;
}

const GenericButton = ({ svgPath, text, href, clickEvent, isCompact, isRound, isSelected, children }: propTypes) => {
	const Content = () => (
		<button
			onClick={clickEvent}
			className={`genericButton ${isRound && 'roundButton'} ${isCompact && 'compactButton'} ${
				!text && 'noText'
			} ${isSelected && 'selected'}`}
		>
			{svgPath && SVGS[svgPath]}
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
