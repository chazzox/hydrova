// fixes error when trying to import SVGs
declare module '*.svg' {
	const content: any;
	export default content;
}
