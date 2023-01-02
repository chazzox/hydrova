const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV !== 'production',
	ignoreBuildErrors: true,

	runtimeCaching
});

module.exports = withPWA({ ignoreBuildErrors: true });
