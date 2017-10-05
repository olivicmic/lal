'use strict';

exports.dateFormat = function () {
	var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		time = new Date(),
		day = time.getDate(),
		mm = time.getMonth(),
		year = time.getFullYear(),
		hr = time.getHours(),
		min = time.getMinutes(),
		month = monthArr[mm],
		minPad = '';

	if (min < 10) {
		minPad = 0;
	}

	var clock = function () {
		if (hr >= 12) {
			var hour = hr - 12;
			return hour + '.' + min + '_' + 'PM';
		}
		return hr + '.' + minPad + min + '_' +'AM';
	};
	return month + '_' + day + '_' + year + '_' + clock();
};


exports.byteFormat = function (bytes, decimals) {
	if (bytes === 0 || !bytes) return '0 Byte';
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