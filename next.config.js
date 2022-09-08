/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
	dest: 'public',
	runtimeCaching
});

module.exports = withPWA({});
