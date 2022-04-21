export function getDateToday() {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	const yyyy = today.getFullYear();

	return { dd, mm, yyyy }
}

export function unixToDate(unix) {
	const date = new Date(unix)
	const dd = String(date.getDate()).padStart(2, "0");
	const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
	const yyyy = date.getFullYear();

	return { dd, mm, yyyy }
}
