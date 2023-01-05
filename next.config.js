const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production',
	runtimeCaching
});

module.exports = withPWA({
	swcMinify: true,
	experimental: {
		forceSwcTransforms: true
	}
});
