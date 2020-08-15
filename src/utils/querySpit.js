export default function queryStringToJSON(queryString) {
	const pairs = queryString.split('&');
	var result = {};
	pairs.forEach(function (pair) {
		pair = pair.split('=');
		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});
	return result;
}
