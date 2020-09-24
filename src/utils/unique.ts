export default function unique<T>(data: T[], key: any): T[] {
	const arr = [...new Map(data.map(x => [key(x), x])).values()];
	return arr;
}
