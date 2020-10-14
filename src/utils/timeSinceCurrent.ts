export default function timeSinceCurrent(timeSince: number): number {
	const currentTime = new Date().getTime()
	const timeDifference = currentTime-timeSince
	const hourSince = Math.floor((timeDifference / 60) / 60)
	return hourSince
}