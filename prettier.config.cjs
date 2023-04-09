/** @type {import('@types/prettier').Options} */
module.exports = {
	plugins: [require('prettier-plugin-tailwindcss')],
	useTabs: true,
	tabWidth: 4,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	htmlWhitespaceSensitivity: 'strict'
};
