// fixes error when trying to import SVGs using the gatsby-svg plugin
declare module '*.svg' {
	const content: any;
	export default content;
}
