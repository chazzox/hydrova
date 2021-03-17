import React from 'react';

import SVGS from 'assets/exportSVG';
import styled from 'styled-components';

interface propTypes {
	svgPath?: keyof typeof SVGS;
	text?: string | number;
	clickEvent?: () => void;
	children?: React.ReactNode;
}

export const Button = styled.button`
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	padding: ${(props) => props.theme.base.paddingSecondary}px 16px;
	color: ${(props) => props.theme.colors.primaryText};

	width: 100%;
	margin: 5px auto;
	text-transform: capitalize;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	background: none;
	border: none;
	outline: none;
	font-size: 11pt;
	line-height: 20px;

	&:hover {
		background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	}
`;
