/**
 * Returns a nice string representing the difference between the current date and the given date
 * @param date the utc number of the data to compare against
 * @returns difference string 
 */
export const getDateDiffString = (date: number) => {
	const current = new Date();
	const diff = current.getTime() - new Date(date).getTime();

	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffMonths / 12);

	if (diffYears > 1) {
		return `${diffYears} years ago`;
	} else if (diffMonths > 1) {
		return `${diffMonths} months ago`;
	} else if (diffDays > 1) {
		return `${diffDays} days ago`;
	} else if (diffHours > 1) {
		return `${diffHours} hours ago`;
	} else if (diffMinutes > 1) {
		return `${diffMinutes} minutes ago`;
	}

	return 'right now';
};
