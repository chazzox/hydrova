const path = require('path');

module.exports = {
	plugins: [
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				components: path.join(__dirname, 'src/components'),
				assets: path.join(__dirname, 'src/assets'),
				pages: path.join(__dirname, 'src/pages'),
				utils: path.join(__dirname, 'src/utils'),
				redux: path.join(__dirname, 'src/redux')
			}
		},
		`gatsby-plugin-react-helmet`
	]
};
