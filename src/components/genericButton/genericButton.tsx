import React from 'react';

import SVGS from '../../assets/icons/exportSVG';

interface propTypes {
	svgPath?: string;
	text?: string;
	id?: string;
	href?: string;
}

const GenericButton = ({ svgPath, text, id, href }: propTypes) => {
	return (
		<a id={id} href={href || ''}>
			<button className={svgPath ? 'iconButton' : ''} id={href || ''}>
				{svgPath ? SVGS[svgPath] : null}
				{text ? text : null}
			</button>
		</a>
	);
};

export default GenericButton;
