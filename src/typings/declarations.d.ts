import 'styled-components';

// extending styled components default theme
declare module 'styled-components' {
	export interface DefaultTheme {
		name: string;

		primaryBackground: string;
		secondaryBackground: string;
		tertiaryBackground: string;

		primaryAccentBackground: string;
		secondaryAccentBackground: string;
		tertiaryAccentBackground: string;

		primaryText: string;
		secondaryText: string;
		tertiaryText: string;

		buttonTextColor: string;
		borderColor: string;

		sidebarPrimaryColor?: string;
	}
}
