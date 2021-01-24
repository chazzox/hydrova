import React from 'react';
import { NavLink } from 'react-router-dom';
import ClassNames from 'classnames';

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
	additionalStyles = {},
	isExact
}: propTypes) => {
	const Content = () => (
		<button
			id={id ? id : ''}
			onClick={clickEvent}
			className={ClassNames(
				'genericButton',
				{ roundButton: isRound },
				{ compactButton: isCompact },
				{ noText: !text },
				{ selected: isSelected }
			)}
			style={additionalStyles}
		>
			{svgPath && SVGS[svgPath]}
			{children}
			{text}
		</button>
	);
	if (!href) return <Content />;
	return (
		<NavLink exact={!!isExact ? undefined : true} to={href} activeClassName="selected">
			<Content />
		</NavLink>
	);
};

export default GenericButton;
