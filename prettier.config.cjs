/**
 * @type {import('@types/prettier').Options}
 */
module.exports = {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'none',
	printWidth: 100,
	plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
};
