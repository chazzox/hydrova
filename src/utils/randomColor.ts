function genColor(nameToHash: string): string {
	const colorArray = [
		'#40a8c4',
		'#81b214',
		'#206a5d',
		'#ea5455',
		'#2d4059',
		'#e11d74',
		'#776d8a',
		'#519872',
		'#318fb5',
		'#00bcd4',
		'#848ccf',
		'#93b5e1',
		'#cf1b1b',
		'#0f4c75',
		'#6f4a8e'
	];
	return colorArray[[...nameToHash].map((element) => element.charCodeAt(0)).reduce((a, b) => a + b) % colorArray.length];
}

export default genColor;
