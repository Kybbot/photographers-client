export const formatDate = (date: string) => {
	const convertedToDate = new Date(date);

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const year = convertedToDate.getFullYear();
	const month = convertedToDate.getMonth();
	const day = convertedToDate.getDate();

	return `${months[month]} ${day} ${year}`;
};
