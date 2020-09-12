function getProfileImageUrl(url: string) {
	if (url === undefined) return '';
	else return url.split('?')[0];
}

export default getProfileImageUrl;
