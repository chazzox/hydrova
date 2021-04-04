const path = require('path');

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
	if (getConfig().mode === 'production') {
		actions.setWebpackConfig({
			devtool: false
		});
	}
	actions.setWebpackConfig({
		resolve: {
			alias: {
				'@assets': path.resolve(__dirname, 'src/assets/'),
				'@components': path.resolve(__dirname, 'src/components/'),
				'@pages': path.resolve(__dirname, 'src/pages/'),
				'@redux': path.resolve(__dirname, 'src/redux/'),
				'@typings': path.resolve(__dirname, 'src/typings/'),
				'@utils': path.resolve(__dirname, 'src/utils/')
			}
		}
	});
};
