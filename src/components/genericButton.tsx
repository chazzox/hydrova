import React from 'react';
import { NavLink } from 'react-router-dom';

import SVGS from 'assets/exportSVG';

import 'styles/component/button/generic.scss';
import 'styles/component/button/compact.scss';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string | number;
	href?: string;
	id?: string;
	clickEvent?: () => void;
	isSelected?: boolean;
	isCompact?: boolean;
	isRound?: boolean;
	children?: JSX.Element;
	isExact?: boolean;
}

const GenericButton = ({
	svgPath,
	text,
	href,
	id,
	clickEvent,
	isCompact,
	isRound,
	isSelected,
	children,
	isExact = true
}: propTypes) => {
	const Content = () => (
		<button
			id={id ? id : ''}
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
				<NavLink exact={isExact} to={href} activeClassName="selected">
					<Content />
				</NavLink>
			) : (
				<Content />
			)}
		</>
	);
};

export default GenericButton;
