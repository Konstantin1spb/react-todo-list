export const sortByTitle = (a, b) => {
	if (a[1].title.toLowerCase() < b[1].title.toLowerCase()) {
		return -1;
	}
	if (a[1].title.toLowerCase() > b[1].title.toLowerCase()) {
		return 1;
	}
	return 0;
};
