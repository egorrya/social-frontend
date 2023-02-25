const dateChanger = (date: string) => {
	const dateObj = new Date(date);

	const dateNow = new Date();
	const diff = dateNow.getTime() - dateObj.getTime();
	const diffSeconds = Math.floor(diff / 1000);
	const diffMinutes = Math.floor(diff / (1000 * 60));
	const diffHours = Math.floor(diff / (1000 * 3600));
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));

	if (diffDays > 30) {
		return `${Math.floor(diffDays / 30)} ${
			Math.floor(diffDays / 30) === 1 ? 'month' : 'months'
		} ago`;
	}

	if (diffDays > 0) {
		return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
	}

	if (diffHours > 0) {
		return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
	}

	if (diffMinutes > 0) {
		return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
	}

	if (diffSeconds > 0) {
		return `${diffSeconds} ${diffSeconds === 1 ? 'second' : 'seconds'} ago`;
	}

	return 'Just now';
};

export default dateChanger;
