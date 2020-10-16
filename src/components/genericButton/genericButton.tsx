import React from 'react';
import { Link } from 'react-router-dom';

import SVGS from '../../assets/icons/exportSVG';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string;
	id?: string;
	href?: string;
	clickEvent?: () => void;
	children?: JSX.Element;
}

const GenericButton = ({ svgPath, text, id, href, clickEvent, children }: propTypes) => {
	const Content = () => (
		<button onClick={clickEvent} className={svgPath ? 'iconButton' : ''} id={id || ''}>
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
