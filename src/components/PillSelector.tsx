import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const PillSelectorWrapper = styled.div`
	padding: ${(props) => props.theme.base.paddingPrimary}px;
	background-color: ${(props) => props.theme.colors.secondaryAccentBackground};
	border-radius: ${(props) => props.theme.base.borderRadiusPrimary}px;
	height: fit-content;
	width: fit-content;
	margin: 20px auto;
	overflow: hidden;
	display: flex;
`;

const Pill = styled(Link)`
	border-radius: ${(props) => props.theme.base.paddingPrimary}px;
	margin-right: ${(props) => props.theme.base.paddingPrimary}px;
	padding: ${(props) => props.theme.base.paddingPrimary}px ${(props) => props.theme.base.paddingSecondary}px;
	color: ${(props) => props.theme.colors.secondaryText};
	text-transform: capitalize;
	text-decoration: none;
	text-align: center;
	position: relative;
	cursor: pointer;
	flex-basis: 0;
	flex-grow: 1;
	width: 120px;
	&:hover {
		background-color: ${(props) => props.theme.colors.primaryText};
		color: ${(props) => props.theme.colors.secondaryBackground};
		font-weight: 600;
	}
	&.active {
		background-color: ${(props) => props.theme.colors.primaryAccentBackground} !important;
		color: ${(props) => props.theme.colors.buttonTextColor};
		font-weight: 600;
	}
`;

const PillSelector = () => {
	return (
		<PillSelectorWrapper>
			<Pill activeClassName="active" to="/settings/account/">
				Account
			</Pill>
			<Pill activeClassName="active" to="/settings/appearance/">
				Appearance
			</Pill>
			<Pill activeClassName="active" to="/settings/content/">
				Content
			</Pill>
			<Pill activeClassName="active" to="/settings/general/">
				General
			</Pill>
			<Pill activeClassName="active" to="/settings/keybinds/">
				Keybinds
			</Pill>
		</PillSelectorWrapper>
	);
};

export default PillSelector;
