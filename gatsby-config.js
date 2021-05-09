module.exports = {
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Hydrova`,
				short_name: `Hydrova`,
				start_url: `/`,
				background_color: `rgb(32, 34, 37)`,
				theme_color: `rgb(20, 20, 26)`,
				display: `standalone`,
				icon: `static/icon-144x144.png`
			}
		}
	]
};
