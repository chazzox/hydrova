import * as React from 'react';
import styled from 'styled-components';

import { Hydrova } from 'assets/Icons';

const Box = styled.div`
	background: ${(props) => props.theme.colors.tertiaryBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusSecondary}px;
	border-color: ${(props) => props.theme.colors.borderColor};
	box-shadow: 0 12px 30px 4px rgba(0, 0, 0, 0.26);
	transform: translate(-50%, -50%);
	width: calc(100vw - 20px);
	border-style: solid;
	position: absolute;
	border-width: 1px;
	max-width: 600px;
	padding: 25px;
	left: 50%;
	top: 50%;
`;
const SmallBox = styled.div`
	background: ${(props) => props.theme.colors.secondaryBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	padding-bottom: 20px;
	margin-bottom: 30px;
	text-align: center;
	padding-top: 70px;
	margin-top: 60px;
	h1 {
		color: ${(props) => props.theme.colors.primaryText};
		font-weight: 600;
		font-size: 26pt;
		margin: 0;
	}

	h2 {
		color: ${(props) => props.theme.colors.secondaryText};
		font-weight: 500;
		font-size: 12pt;
		margin: 10px 0;
	}
`;

const StyledHydrova = styled(Hydrova)`
	position: absolute;
	width: 150px;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
`;

const WelcomeBox: React.FC<{ topText: string; bottomText: string; innerBoxChild?: React.ReactNode }> = ({
	topText,
	bottomText,
	children,
	innerBoxChild
}) => {
	return (
		<Box>
			<StyledHydrova />
			<SmallBox>
				<h1>{topText}</h1>
				<h2>{bottomText}</h2>
				{innerBoxChild}
			</SmallBox>
			{children}
		</Box>
	);
};

export default WelcomeBox;
