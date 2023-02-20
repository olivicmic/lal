module.exports = (bytes, decimals) => {
	if (bytes === 0 || !bytes) return '0 Bytes';
	var units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
		decLength = decimals || 0,
		sizeScale = Math.log(bytes),
		base = 1000,
		baseScale = Math.log(base),
		relativeScale = Math.floor(sizeScale / baseScale),
		byteValue = parseFloat((bytes / Math.pow(base, relativeScale)).toFixed(decLength)),
		byteString = byteValue + ' ' + units[relativeScale];

	return byteString;
};