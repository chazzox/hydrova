import { BasicValues, ColorTheme } from '@typings/declarations';

export type themeKeys =
	| 'defaultLight'
	| 'defaultDark'
	| 'gruvboxLight'
	| 'gruvboxDark'
	| 'horizonLight'
	| 'horizonDark'
	| 'dracula'
	| 'bestOfBoth'
	| 'greenFlair';

export const themes: Record<themeKeys, ColorTheme> = {
	defaultLight: {
		name: 'Default Light',

		primaryBackground: 'rgb(221, 229, 240)',
		secondaryBackground: 'rgb(246, 250, 253)',
		tertiaryBackground: 'rgb(255, 255, 255)',

		primaryAccentBackground: 'rgb(88, 94, 254)',
		secondaryAccentBackground: 'rgb(220, 230, 240)',
		tertiaryAccentBackground: 'rgb(46, 50, 94)',

		primaryText: 'rgb(0, 0, 0)',
		secondaryText: 'rgb(0, 0, 0)',
		tertiaryText: 'rgb(0, 0, 0)',

		buttonTextColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(234, 240, 245)'
	},
	defaultDark: {
		name: 'Default Dark',

		primaryBackground: 'rgb(32, 34, 37)',
		secondaryBackground: 'rgb(20, 20, 26)',
		tertiaryBackground: 'rgb(39, 41, 44)',

		primaryAccentBackground: 'rgb(88, 94, 254)',
		secondaryAccentBackground: 'rgb(52, 58, 64)',
		tertiaryAccentBackground: 'rgb(46, 50, 94)',

		primaryText: 'rgb(255, 255, 255)',
		secondaryText: 'rgba(255, 255, 255, 0.66)',
		tertiaryText: 'rgba(255, 255, 255, 0.4)',

		buttonTextColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(59, 59, 59)'
	},

	gruvboxLight: {
		name: 'Gruvbox Light',

		primaryBackground: 'rgb(235, 218, 180)',
		secondaryBackground: 'rgb(235, 218, 180)',
		tertiaryBackground: 'rgb(251, 240, 201)',

		primaryAccentBackground: 'rgb(240, 103, 24)',
		secondaryAccentBackground: 'rgb(208, 193, 153)',
		tertiaryAccentBackground: 'rgb(175, 58, 3)',

		primaryText: 'rgb(60, 56, 54)',
		secondaryText: 'rgb(157, 0, 6)',
		tertiaryText: 'rgb(121, 116, 14)',

		buttonTextColor: 'rgb(50, 46, 44)',
		borderColor: 'rgb(233, 216, 181)'
	},
	gruvboxDark: {
		name: 'Gruvbox Dark',

		primaryBackground: 'rgb(29, 32, 33)',
		secondaryBackground: 'rgb(45, 43, 42)',
		tertiaryBackground: 'rgb(40, 40, 40)',

		primaryAccentBackground: 'rgb(254, 128, 25)',
		secondaryAccentBackground: 'rgb(80, 73, 69)',
		tertiaryAccentBackground: 'rgb(158, 70, 12)',

		primaryText: 'rgb(235, 219, 178)',
		secondaryText: 'rgb(168, 153, 132)',
		tertiaryText: 'rgb(125, 106, 94)',

		buttonTextColor: 'rgb(235, 219, 178)',
		borderColor: 'rgb(60, 56, 54)'
	},

	horizonLight: {
		name: 'Horizon Light',

		primaryBackground: 'rgb(233, 220, 218)',
		secondaryBackground: 'rgb(253, 240, 238)',
		tertiaryBackground: 'rgb(253, 240, 238)',

		primaryAccentBackground: 'rgb(234, 83, 120)',
		secondaryAccentBackground: 'rgb(252, 223, 219)',
		tertiaryAccentBackground: 'rgb(46, 50, 94)',

		primaryText: 'rgb(0, 0, 0)',
		secondaryText: 'rgba(0, 0, 0, 0.75)',
		tertiaryText: 'rgba(0, 0, 0, 0.6)',

		buttonTextColor: 'rgb(0, 0, 0)',
		borderColor: 'rgb(246, 210, 220)'
	},
	horizonDark: {
		name: 'Horizon Dark',

		primaryBackground: 'rgb(19, 21, 29)',
		secondaryBackground: 'rgb(29, 31, 39)',
		tertiaryBackground: 'rgb(29, 31, 39)',

		primaryAccentBackground: 'rgb(234, 83, 120)',
		secondaryAccentBackground: 'rgb(43, 47, 56)',
		tertiaryAccentBackground: 'rgb(141, 51, 74)',

		primaryText: 'rgb(203, 204, 207)',
		secondaryText: 'rgb(150, 98, 92)',
		tertiaryText: 'rgba(203, 204, 207, 0.4)',

		buttonTextColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(59, 59, 59)'
	},

	dracula: {
		name: 'Dracula',

		primaryBackground: 'rgb(30, 32, 44)',
		secondaryBackground: 'rgb(46, 51, 65)',
		tertiaryBackground: 'rgb(40, 42, 54)',

		primaryAccentBackground: 'rgb(179, 137, 239)',
		secondaryAccentBackground: 'rgb(56, 58, 89)',
		tertiaryAccentBackground: 'rgb(104, 67, 155)',

		primaryText: 'rgb(255, 255, 255)',
		secondaryText: 'rgba(255, 255, 255, 0.66)',
		tertiaryText: 'rgb(100, 107, 132)',

		buttonTextColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(52, 54, 84)'
	},
	bestOfBoth: {
		name: 'Best Of Both',

		primaryBackground: 'rgb(220, 210, 231)',
		secondaryBackground: 'rgb(14, 23, 38)',
		tertiaryBackground: 'rgb(255, 255, 255)',

		primaryAccentBackground: 'rgb(88, 94, 254)',
		secondaryAccentBackground: 'rgb(225, 210, 255)',
		tertiaryAccentBackground: 'rgb(46, 50, 94)',

		primaryText: 'rgb(0, 0, 0)',
		secondaryText: 'rgba(0, 0, 0, 0.75)',
		tertiaryText: 'rgba(0, 0, 0, 0.6)',

		buttonTextColor: 'rgb(255, 255, 255)',
		borderColor: 'rgb(234, 240, 245)'
	},
	greenFlair: {
		name: 'Green Flair',

		primaryBackground: 'rgb(233, 220, 218)',
		secondaryBackground: 'rgb(253, 240, 238)',
		tertiaryBackground: 'rgb(253, 240, 238)',

		primaryAccentBackground: 'rgb(234, 83, 120)',
		secondaryAccentBackground: 'rgb(252, 223, 219)',
		tertiaryAccentBackground: 'rgb(46, 50, 94)',

		primaryText: 'rgb(0, 0, 0)',
		secondaryText: 'rgba(0, 0, 0, 0.75)',
		tertiaryText: 'rgba(0, 0, 0, 0.6)',

		buttonTextColor: 'rgb(0, 0, 0)',
		borderColor: 'rgb(246, 210, 220)'
	}
};

export const baseTheme: BasicValues = {
	borderRadiusPrimary: 8,
	borderRadiusSecondary: 11,

	paddingPrimary: 8,
	paddingSecondary: 11,
	paddingTertiary: 24
};
