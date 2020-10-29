import React from 'react';
import { Link } from 'react-router-dom';

import SVGS from '../../assets/icons/exportSVG';

import './genericButton.scss';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string;
	id?: string;
	href?: string;
	clickEvent?: () => void;
	children?: JSX.Element;
	isSelected?: boolean | null;
}

const GenericButton = ({ svgPath, text, id, href, clickEvent, children, isSelected }: propTypes) => {
	const genClasses = () => {
		const classNames: string[] = [];
		if (svgPath) classNames.push('iconButton');
		if (isSelected) classNames.push('selected');
		return classNames.join(' ');
	};
	const Content = () => (
		<button onClick={clickEvent} className={genClasses() || 'genericButton'} id={id || ''}>
			{svgPath ? SVGS[svgPath] : null}
			{text ? text : null}
			{children}
		</button>
	);
	return (
		<>
			{href ? (
				<Link to={href}>
					<Content />
				</Link>
			) : (
				<Content />
			)}
		</>
	);
};

export default GenericButton;
