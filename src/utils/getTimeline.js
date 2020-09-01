export default function getBatches(oauthAccessToken, afterId, batchCount, updateFunction, path) {
	fetch('https://oauth.reddit.com/' + path + '/?limit=' + batchCount + '&after=' + afterId, {
		method: 'GET',
		headers: { Authorization: 'Bearer ' + oauthAccessToken },
		redirect: 'manual'
	})
		.then((response) => response.text())
		.then((text) => JSON.parse(text))
		.then(updateFunction)
		.catch((error) => console.log('error', error));
}
