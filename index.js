'use strict';

var hexColorRegex = require('hex-color-regex'),
	LookupIP = require('./modules/LookupIP'),
	lorem = require('./lorem-ipsum');

exports.generateUnique = generateUnique;
exports.lookupIP = LookupIP;
exports.dateFormat = dateFormat;
exports.byteFormat = byteFormat;
exports.hexSetCheck = hexSetCheck;

function generateUnique(input) {
	if (!input) input = {};
	if (!input.existing) input.existing = [];
	if (!input.charCount) input.charCount = 6;
	if (input.preset === 'lorem ipsum') input.charSet = lorem.ipsum();
	if (input.preset === 'hex') input.charSet = '0123456789abcdef';
	if (input.whiteSpace) input.charCount *= 2;
	if (!input.preset && !input.charSet || typeof input.charSet != 'string' && !Array.isArray(input.charSet))
		input.charSet = '23456789abdegjkmnpqrvwxyz';

	var id = '',
		retries = 0,
		uniqueRetries = 9999;

	if (input.existing.length > 0) {
		while (!id && retries < uniqueRetries) {
			id = generate(input);
			if (input.existing.indexOf(id) !== -1) {
				id = null;
				retries++;
			}
		}
	} else id = generate(input);

	return id;
}

function generate(input) {
	var string = '',
		chance = 10,
		capNext = false,
		rand = (range) => () => Math.floor(Math.random() * range),
		randomIndex = rand(input.charSet.length),
		doPeriod = rand(chance),
		modString = () => input.charSet[randomIndex()];

	var punctuation = () => {
		let puncRand = rand(14);
		if (puncRand() <= 10) return '.';
		else if (puncRand() <= 11) return '!';
		else return '?';
	};

	if (Array.isArray(input.charSet)) {
		for (var i = 0; i < input.charCount; i++) {
			if (input.whiteSpace === true && !isEven(i)) string += ' ';
			else if (input.whiteSpace === true) {
				let glyph = modString();
				if (input.sentences && i === 0 || capNext === true) {
					string += glyph.charAt(0).toUpperCase() + glyph.slice(1);
					if (i === input.charCount - 2) string += punctuation();
					capNext = false;
				} else {
					string += modString();
					if (input.sentences && doPeriod() === chance - 1 || i === input.charCount - 2) {
						string += punctuation();
						capNext = true;
					} else if (input.sentences && doPeriod() === chance - 1) string += ',';
				}
			} else {
				string += modString();
			}
		}
	} else {
		for (var i = 0; i < input.charCount; i++) {
			if (input.whiteSpace === true && !isEven(i)) string += ' ';
			else string += input.charSet.charAt(randomIndex());
		}
	}

	if (input.sentences === true) return string.trim();
	return string;
}

function isEven(value) {
	if (value % 2 === 0) return true;
	else return false;
}

function dateFormat() {
	var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		time = new Date(),
		day = time.getDate(),
		mm = time.getMonth(),
		year = time.getFullYear(),
		hr = time.getHours(),
		min = time.getMinutes(),
		month = monthArr[mm],
		minPad = '';

	if (min < 10) minPad = 0;

	var clock = () => {
		if (hr >= 12) {
			var hour = hr - 12;
			return hour + '.' + min + '_' + 'PM';
		}
		return hr + '.' + minPad + min + '_' +'AM';
	};
	return month + '_' + day + '_' + year + '_' + clock();
}

function byteFormat(bytes, decimals) {
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
}

function hexSetCheck(arr) {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (hexColorRegex({ strict: true }).test(arr[i])) result.push(true);
		else result.push(false);
	}
	return result;
}

