'use strict';

var request = require('request'),
	hexColorRegex = require('hex-color-regex');

var lookupIP = function (input, output) {
	var lookup;
	if (!input.ip) return output({ error: 'No IP provided' }, null);
	if (!input.host || input.host === 'ip-api') lookup = 'http://ip-api.com/json/' + input.ip;
	else if (input.host === 'freegeoip') lookup = 'http://freegeoip.net/json/' + input.ip;
	else if (input.host === 'ipapi') lookup = 'https://ipapi.co/' + input.ip + '/json';
	else if (input.host === 'extreme') lookup = 'http://extreme-ip-lookup.com/json/' + input.ip;
	else if (input.host === 'ipinfo') lookup = 'https://ipinfo.io/' + input.ip + '/json';
	else return output({ error: 'Invalid host' }, null);

	request(lookup, function (err, res, body) {
		if (err) return output(err, null);

		var result = JSON.parse(body);

		return output(null, result);
	});
};

var dateFormat = function () {
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


var byteFormat = function (bytes, decimals) {
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

var hexSetCheck = function (arr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (hexColorRegex({ strict: true }).test(arr[i])) result.push(true);
		else result.push(false);
	}
	return result;
};

exports.lookupIP = lookupIP;
exports.dateFormat = dateFormat;
exports.byteFormat = byteFormat;
exports.hexSetCheck = hexSetCheck;