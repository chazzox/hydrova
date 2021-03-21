import { BasicValues, ColorTheme } from '../typings/declarations';

export const themes: { [key: string]: ColorTheme } = {
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

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
	},
	gruvboxDark: {
		name: 'Gruvbox Dark',

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
	},

	horizonLight: {
		name: '',

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
	},
	horizonDark: {
		name: '',

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
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
		name: '',

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
	},
	greenFlair: {
		name: '',

		primaryBackground: '',
		secondaryBackground: '',
		tertiaryBackground: '',

		primaryAccentBackground: '',
		secondaryAccentBackground: '',
		tertiaryAccentBackground: '',

		primaryText: '',
		secondaryText: '',
		tertiaryText: '',

		buttonTextColor: '',
		borderColor: ''
	}
};

export const baseTheme: BasicValues = {
	borderRadiusPrimary: 8,
	borderRadiusSecondary: 11,

	paddingPrimary: 8,
	paddingSecondary: 11,
	paddingTertiary: 24
};
