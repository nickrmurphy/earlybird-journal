export function getRelativeTime(date: string | Date): string {
	const now = new Date();
	const targetDate = new Date(date);
	const diffInMs = now.getTime() - targetDate.getTime();
	const diffInSeconds = Math.floor(diffInMs / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);
	const diffInWeeks = Math.floor(diffInDays / 7);
	const diffInMonths = Math.floor(diffInDays / 30);
	const diffInYears = Math.floor(diffInDays / 365);

	if (diffInSeconds < 60) {
		return "just now";
	}
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
	}
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
	}
	if (diffInDays < 7) {
		return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
	}
	if (diffInWeeks < 4) {
		return `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"} ago`;
	}
	if (diffInMonths < 12) {
		return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
	}
	return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
}
