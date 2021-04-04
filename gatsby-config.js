module.exports = {
	pathPrefix: `/Hydrova`,
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Hydrova`,
				short_name: `Hydrova`,
				start_url: `/`,
				background_color: `rgb(32, 34, 37)`,
				theme_color: `rgb(20, 20, 26)`,
				display: `standalone`,
				icon: `src/assets/favicon.ico`
			}
		}
	]
};
