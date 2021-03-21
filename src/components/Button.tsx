import * as React from 'react';
import styled from 'styled-components';

import SVGS from 'assets/exportSVG';

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
