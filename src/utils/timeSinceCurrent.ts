export default function timeSinceCurrent(dateInUTC: number): number {
	// convert time to usable format
	let previousTime = new Date(dateInUTC * 1000);
	// get current time and compare to the time passed in
	let currentTime = new Date();
	let timeDifference = currentTime.getTime() - previousTime.getTime();
	return timeDifference;
}

export function formatTimeSince(timeInMilliseconds: number): string {
	// convert passed value to minutes
	let finalOutput = timeInMilliseconds / 60000;
	let unit = 'minutes';

	// check if hours are a better unit
	if (finalOutput >= 60) {
		finalOutput = finalOutput / 60;
		unit = 'hour';
	}

	// check if days are a better unit
	if (finalOutput >= 24) {
		finalOutput = finalOutput / 24;
		unit = 'day';
	}

	finalOutput = Math.round(finalOutput);

	return finalOutput + ' ' + unit + (finalOutput > 1 ? 's ' : ' ') + ' ago';
}
