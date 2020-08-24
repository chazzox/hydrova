// function what splits the query string (everything after the ? in a url) and returns a json to traverse
export default function queryStringToJSON(queryString) {
	// splitting all values in the query string
	const shortQuery = queryString.slice(0, -2 + queryString.length);
	const pairs = shortQuery.split('&');
	var result = {};
	pairs.forEach(function (pair) {
		// splitting the query and the value
		pair = pair.split('=');

		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});
	console.log(result);
	return result;
}
