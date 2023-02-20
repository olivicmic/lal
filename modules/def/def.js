module.exports = (...a) => {
	let onMatch;
	let matched;
	let match = a.find((b, i) => {
		if (i === 0 && b instanceof Function) {
			onMatch = b;
		} else if (b || b === 0) {
			matched = true;
			return true;
		}
		return false;
	});

	return (matched && onMatch) ? onMatch(match) : match;
}
