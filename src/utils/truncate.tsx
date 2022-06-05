function truncateText(str: string, num: number, useWordBoundary: boolean) {
	if (str.length <= num) return str;

	const subString = str.substring(0, num - 1);

	return (
		(useWordBoundary
			? subString.substring(0, subString.lastIndexOf(" "))
			: subString) + String.fromCharCode(8230)
	);
}

export default truncateText;
