import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: 'Roboto', sans-serif;
		box-sizing: border-box;
		letter-spacing: 0.5pt;
	}

	body {
		background-color: ${(props) => props.theme.colors.primaryBackground};
		padding: 0;
		margin: 0;
	}

	#gatsby-focus-wrapper {
		display: flex;
		padding-right: ${(props) => props.theme.base.paddingSecondary}px;
	}

	::-webkit-scrollbar {
		background-color: rgba(0, 0, 0, 0);
		width: 16px;
	}
	::-webkit-scrollbar-track {
		background-color: ${(props) => props.theme.colors.tertiaryBackground};
	}
	::-webkit-scrollbar-track:hover {
		background-color: ${(props) => props.theme.colors.secondaryBackground};
	}
	::-webkit-scrollbar-thumb {
		background-color: ${(props) => props.theme.colors.tertiaryText};
		border-radius: 16px;
		border: 6px solid ${(props) => props.theme.colors.tertiaryBackground};
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: ${(props) => props.theme.colors.secondaryText};
		border: 3px solid ${(props) => props.theme.colors.secondaryBackground};
	}
	::-webkit-scrollbar-button {
		display: none;
	}
`;

export default Global;
