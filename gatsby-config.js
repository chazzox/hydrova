module.exports = {
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'Hydrova',
				short_name: 'Hydrova | High performance reddit client',
				start_url: '/',
				display: 'standalone',
				crossOrigin: `use-credentials`
			}
		}
	]
};
