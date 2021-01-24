const path = require('path');

module.exports = {
	pathPrefix: `/Hydrova`,
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{ resolve: 'gatsby-plugin-no-sourcemaps' },
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Hydrova',
				short_name: 'Hydrova | High performance reddit client',
				start_url: '/',
				display: 'standalone',
				crossOrigin: `use-credentials`,
				icon: 'static/icon-144x144.png'
			}
		},
		{
			resolve: `gatsby-plugin-offline`,
			options: {
				precachePages: [`/`]
			}
		},
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
				components: path.join(__dirname, 'src/components'),
				reduxStore: path.join(__dirname, 'src/reduxStore'),
				styles: path.join(__dirname, 'src/styles'),
				routes: path.join(__dirname, 'src/routes'),
				assets: path.join(__dirname, 'src/assets'),
				utils: path.join(__dirname, 'src/utils'),
				pages: path.join(__dirname, 'src/pages')
			}
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /icons/
				}
			}
		}
	]
};
