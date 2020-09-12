export default function queryStringToJSON(queryString: string): { code: string } {
	// splitting all values in the query string
	const pairs = queryString.split('&');
	var result = { code: '' };
	pairs.forEach(valuePair => {
		// splitting the query and the value
		let pairArr: string[] = valuePair.split('=');
		if (pairArr[0] === 'code') result.code = decodeURIComponent(pairArr[1]);
	});
	return result;
}
