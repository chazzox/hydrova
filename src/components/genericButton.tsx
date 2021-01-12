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
	additionalStyles?: React.CSSProperties;
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
	isExact = true,
	additionalStyles = {}
}: propTypes) => {
	const Content = () => (
		<button
			id={id ? id : ''}
			onClick={clickEvent}
			className={`genericButton ${isRound ? 'roundButton' : ''} ${isCompact ? 'compactButton' : ''} ${
				!text ? 'noText' : ''
			} ${isSelected ? 'selected' : ''}`}
			style={additionalStyles}
		>
			{svgPath && SVGS[svgPath]}
			{children}
			{text}
		</button>
	);
	if (!href) return <Content />;
	return (
		<NavLink exact={isExact} to={href} activeClassName="selected">
			<Content />
		</NavLink>
	);
};

export default GenericButton;
