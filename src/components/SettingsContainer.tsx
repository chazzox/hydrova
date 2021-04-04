import styled from 'styled-components';

export default styled.div`
	color: ${(props) => props.theme.colors.primaryText};
	margin: ${(props) => props.theme.base.paddingTertiary}px auto;
	width: calc(100% - ${(props) => props.theme.base.paddingTertiary}px * 2);
	max-width: 1200px;
	& > h1 {
		color: ${(props) => props.theme.colors.tertiaryText};
		width: fit-content;
		font-weight: 600;
		font-size: 14pt;
	}
	& > p {
		font-size: 11pt;
	}
`;
