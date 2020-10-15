export default function timeSinceCurrent(dateInUTC: number): number {
	// convert time to usable format
	let previousTime = new Date(dateInUTC * 1000);
	// get current time and compare to the time passed in
	let currentTime = new Date();
	let timeDifference = currentTime.getTime() - previousTime.getTime();
	return timeDifference;
}

export function formatTimeSince(timeInMilliseconds: number): string {
	// convert passed value to hours
	let finalOutput = timeInMilliseconds / 3600000;
	let unit = 'hour';

	// check if days are a better unit
	if (finalOutput >= 24) {
		finalOutput = finalOutput / 24;
		unit = 'days';
	}

	return Math.round(finalOutput) + ' ' + unit + (finalOutput > 1 ? 's ' : ' ') + ' ago';
}
