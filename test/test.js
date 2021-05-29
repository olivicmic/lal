'use strict';

const chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	hexColorRegex = require('hex-color-regex'),
	lal = require('../index'),
	lorem = require('../resources/lorem-ipsum'),
	chalk = require('chalk'),
	monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('Testing lal.dateFormat', () => {
	let date = new Date(),
		hr = date.getHours(),
		day = date.getDate(),
		year = date.getFullYear(),
		eve = (hr >= 12);
	console.log(
		'made at: ',
		monthArr[date.getMonth()],
		`${day}`,
		`${date.getFullYear()}`,
		`${eve ? hr - 12 : hr}:${date.getHours()} ${eve ? 'PM' : 'AM'}`
	);
	it('should return a pretty date', (done) => {
		let toTest = lal.dateFormat({date: date}),
			dateArr = toTest.split('_'),
			testDay = Number(dateArr[1]),
			testYEar = Number(dateArr[2]),
			clock = dateArr[3].split('.'),
			hour = Number(clock[0]),
			minute = Number(clock[1]);

		console.log(toTest);

		expect(monthArr.indexOf(dateArr[0])).to.be.above(-1);
		expect(testDay).to.equal(day);
		expect(testYEar).to.equal(year);
		assert.isNumber(hour, 'current hour');
		expect(hour).to.not.equal(NaN);
		assert.isNumber(minute, 'current minute');
		expect(minute).to.not.equal(NaN);
		done();
	});
	it('dateFormat should return equal values despite one instance receiving a date object and the other recieves a date string', (done) => {
		let dateA = lal.dateFormat(new Date('August 19, 1975 13:15:30'));
		let dateB = lal.dateFormat('August 19, 1975 13:15:30');
		console.log(chalk.hex('#ccffff')('date A:', dateA,'date B:', dateB));
		expect(dateA).to.equal(dateB);
		done();
	});
	it('should return a truncated date of 14 characters', (done) => {
		let shortDate = lal.dateFormat({truncate: true});
		console.log('pretty: ', shortDate, 'length: ', shortDate.length);
		expect(shortDate.length).to.equal(14);
		done();
	});
});

describe('Testing lal.byteFormat', () => {
	it('should return \'0 Bytes\'', (done) => {
		var result = lal.byteFormat();
		console.log('Bytes: none');
		console.log('Decimals: none');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Bytes');
		done();
	});

	it('should return \'0 Bytes\'', (done) => {
		var result = lal.byteFormat(0, 0);
		console.log('Bytes: 0');
		console.log('Decimals: 0');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Bytes');
		done();
	});

	it('should return \'347 Bytes\'', (done) => {
		var result = lal.byteFormat(347);
		console.log('Bytes: 347');
		console.log('Returns: ' + result);
		expect(result).to.equal('347 Bytes');
		done();
	});

	it('should return \'56.7 KB\'', (done) => {
		var result = lal.byteFormat(56739, 1);
		console.log('Bytes: 56739');
		console.log('Decimals: 1');
		console.log('Returns: ' + result);
		expect(result).to.equal('56.7 KB');
		done();
	});

	it('should return \'9.81 MB\'', (done) => {
		var result = lal.byteFormat(9812734, 2);
		console.log('Bytes: 9812734');
		console.log('Decimals: 2');
		console.log('Returns: ' + result);
		expect(result).to.equal('9.81 MB');
		done();
	});

	it('should return \'75.20139417 GB\'', (done) => {
		var result = lal.byteFormat(75201394166, 8);
		console.log('Bytes: 75201394166');
		console.log('Decimals: 8');
		console.log('Returns: ' + result);
		expect(result).to.equal('75.20139417 GB');
		done();
	});
});

describe('Testing lal.lookupIP', () => {
	var testIP = '208.80.152.201';

	it('should return object with status property with \'success\' value', (done) => {
		lal.lookupIP({ ip: testIP }, (err, result) => {
			if (err) return done(err);
			console.log('http://ip-api.com/json/' + testIP);
			console.log(result);
			expect(result.status).to.equal('success');
			done();
		});
	});

	it('should return object with country property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'ipapi' }, (err, result) => {
			if (err) return done(err);
			console.log('https://ipapi.co/' + testIP +'/json/');
			console.log(result);
			expect(result.country).to.equal('US');
			done();
		});
	});

	it('should return object with countryCode property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'extreme' }, (err, result) => {
			if (err) return done(err);
			console.log('http://extreme-ip-lookup.com/json/' + testIP);
			console.log(result);
			expect(result.countryCode).to.equal('US');
			done();
		});
	});

	it('should return object with country property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'ipinfo' }, (err, result) => {
			if (err) return done(err);
			console.log('https://ipinfo.io/' + testIP + '/json');
			console.log(result);
			expect(result.country).to.equal('US');
			done();
		});
	});
});

describe('Testing lal.generateUnique', () => {
	var wordSet = ['Apple', 'Donut', 'Banana', 'Pizza', 'Grape', 'Cherry', 'Taco', 'Grape', 'Sandiwch', 'Orange', 'Spaghetti', 'Salad', 'Sushi', 'Pho', 'Tangerine', 'Bacon'];

	it('Should generate a random 6 character string.', (done) => {
		var rando = lal.generateUnique();
		console.log(rando);
		expect(rando.length).to.equal(6);
		expect(typeof rando).to.equal('string');
		done();
	});

	it('Should generate a random 20 character string.', (done) => {
		var rando = lal.generateUnique({ charCount: 20 });
		console.log(rando);
		expect(rando.length).to.equal(20);
		expect(typeof rando).to.equal('string');
		done();
	});

	it('Should generate a random 20 character string with only \'abc\' characters.', (done) => {
		var rando = lal.generateUnique({
			charCount: 20,
			charSet: 'abc'
		});
		console.log(rando);
		expect(rando.length).to.equal(20);
		expect(rando.indexOf('d')).to.equal(-1);
		expect(rando.indexOf('9')).to.equal(-1);
		expect(rando.indexOf('!')).to.equal(-1);
		done();
	});

	it('Should be form new string from string array.', (done) => {
		var rando = lal.generateUnique({
			charCount: 10,
			charSet: wordSet
		});
		console.log(rando);
		expect(rando.length).to.be.above(30);
		console.log('\x07');
		done();
	});

	it('Should generate random string that does not match any in array.', (done) => {
		var testAgainst = ['mzw', 'pxk', 'kvz', '6rd', 'gqg', '2r4', 'abq'],
			rando = lal.generateUnique({
				charCount: 3,
				existing: testAgainst
			});

		console.log('Test set:');
		console.log(testAgainst);
		console.log(rando);
		expect(rando.length).to.equal(3);
		expect(testAgainst.indexOf(rando)).to.equal(-1);
		done();
	});

	it('Should generate random string with white space', (done) => {
		var rando = lal.generateUnique({
			charCount: 10,
			whiteSpace: true
		});

		console.log('Test set:');
		console.log(rando);
		expect(rando.charAt(1)).to.equal(' ');
		expect(rando.charAt(3)).to.equal(' ');
		expect(rando.charAt(5)).to.equal(' ');
		expect(rando.charAt(7)).to.equal(' ');
		expect(rando.charAt(9)).to.equal(' ');
		expect(rando.charAt(11)).to.equal(' ');
		expect(rando.charAt(13)).to.equal(' ');
		expect(rando.charAt(15)).to.equal(' ');
		expect(rando.charAt(17)).to.equal(' ');
		done();
	});

	it('Should generate a lorem ipsum string', (done) => {
		var rando = lal.generateUnique({
				charCount: 30,
				whiteSpace: true,
				preset: 'lorem ipsum',
				sentences: true
			}),
			randoSize = rando.length - 1,
			punctuations = ['.', '?', '!'];

		console.log('Test set:');
		console.log(rando);
		expect(rando.length).to.be.above(120);
		expect(punctuations.indexOf(rando.charAt(randoSize))).to.be.above(-1);
		done();
	});

	it('Should generate a valid random hex code', (done) => {
		var rando = lal.generateUnique({
			charCount: 6,
			preset: 'hex'
		});

		console.log('Test set:');
		console.log(rando);
		expect(hexColorRegex({ strict: true }).test('#' + rando)).to.be.true;
		expect(rando.length).to.equal(6);
		done();
	});
});

describe('Testing lal.arrayList', () => {
	it('Should generate a list sentence string', (done) => {
		let arrList = lal.arrayList(['apple', 'banana', 'orange', 'watermelon']);
		console.log(arrList);
		expect(arrList).to.equal('apple, banana, orange and watermelon');
		done();
	});

	it('Should return a single word', (done) => {
		let arrList = lal.arrayList(['apple']);
		console.log(arrList);
		expect(arrList).to.equal('apple');
		done();
	});

	it('Should return null', (done) => {
		let arrList = lal.arrayList([]);
		console.log(arrList);
		expect(arrList).to.equal('');
		done();
	});
});

describe('Testing lal.random', () => {
	it('Should return a random number from 0 to 10', (done) => {
		let randomNum = lal.random();
		console.log('random made:', randomNum);
		expect(randomNum).to.be.above(-1);
		expect(randomNum).to.be.below(11);
		done();
	});
	it('Should return a random number from 0 to 300', (done) => {
		let randomNum = lal.random(300);
		console.log('random made:', randomNum);
		expect(randomNum).to.be.above(-1);
		expect(randomNum).to.be.below(301);
		done();
	});
});

describe('Testing lal.color.solo', () => {
	it('Should return max red only hex', (done) => {
		let isolateRed = lal.color.solo({ channel: 0, color: 255});
		console.log(chalk.hex(isolateRed)('returned color:', isolateRed));
		expect(isolateRed).to.equal('#ff0000');
		done();
	});
	it('Should return partial green only hex', (done) => {
		let isolateGreen = lal.color.solo({ channel: 1, color: 128});
		console.log(chalk.hex(isolateGreen)('returned color:', isolateGreen));
		expect(isolateGreen).to.equal('#008000');
		done();
	});
	it('Should return partial blue only hex', (done) => {
		let isolateBlue = lal.color.solo({ channel: 2, color: 73});
		console.log(chalk.hex(isolateBlue)('returned color:', isolateBlue));
		expect(isolateBlue).to.equal('#000049');
		done();
	});
	it('Should return black due to invalid channel', (done) => {
		let isolateErr = lal.color.solo({ channel: 7, color: 99});
		console.log(chalk.hex(isolateErr)('returned color:', isolateErr));
		expect(isolateErr).to.equal('#000000');
		done();
	});
});

describe('Testing lal.color.accent', () => {
	it('Should return an object with accent and tone hex colors', (done) => {
		let contrastObj = lal.color.accent({color: '#810059'});
		console.log(contrastObj);
		let contrastArr = [];
		for (let color in contrastObj) {
			if (contrastObj[color]) contrastArr.push(contrastObj[color]);
		};
		let conTest = lal.color.checkHexs(contrastArr);
		expect(conTest[0]).to.equal(true);
		expect(conTest[1]).to.equal(true);
		done();
	});
});

describe('Testing lal.color.illuminate', () => {
	it('Should return a new hex color', (done) => {
		let contrastColor = lal.color.illuminate({color: '#ff0000', channel: 0});
		console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
		expect(contrastColor).to.equal('#ff623c');
		done();
	});
	it('Should return a new hex color with ceiling param', (done) => {
		let contrastColor = lal.color.illuminate({color: '#ff0000', channel: 0, ceiling: 200});
		console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
		expect(contrastColor).to.equal('#ff4c2b');
		done();
	});
	it('Should return a new hex color with floor param', (done) => {
		let contrastColor = lal.color.illuminate({color: '#000000', channel: 0, floor: 66});
		console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
		expect(contrastColor).to.equal('#838383');
		done();
	});
	it('Should return a new hex color with range param', (done) => {
		let contrastColor = lal.color.illuminate({color: '#800000', channel: 0, range: 255});
		console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
		expect(contrastColor).to.equal('#e8583c');
		done();
	});
});

describe('Testing lal.color.checkHexs', () => {
	it('3rd value should be false', (done) => {
		var testArr = ['#89f', '#c7c7c7', '090cff', '#ddd'],
			colorTest = lal.color.checkHexs(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest[2]).to.equal(false);
		done();

	});

	it('No value should be false', (done) => {
		var testArr = ['#a9a9a9', '#810059', '#333', '#783455', '#699'],
			colorTest = lal.color.checkHexs(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest).to.not.include(false);
		done();
	});

	it('All should be false', (done) => {
		var testArr = [592288, 'red', true],
			colorTest = lal.color.checkHexs(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest).to.not.include(true);
		done();
	});
});

describe('Testing lal.color.reverseSolo (uses lal.color.reverse) ', () => {

	it('Should return red', (done) => {
		let reversed = lal.color.reverseSolo();
		console.log(chalk.hex('ff0000')('input: none (value, channel, target, & max undefined)'));
		console.log(chalk.hex(reversed)('returned color:', reversed));
		expect(reversed).to.equal('#ff0000');
		done();
	});

	it('Should return a shade of green via channel param', (done) => {
		let reversed = lal.color.reverseSolo(195,1);
		console.log(chalk.hex('00ff00')('input: (value = 195, channel = 1, target & max = undefined)'));
		console.log(chalk.hex(reversed)('returned color:', reversed));
		expect(reversed).to.equal('#003c00');
		done();
	});

	it('Should return a dim blue', (done) => {
		let reversed = lal.color.reverseSolo(200,2,33);
		console.log(chalk.hex('0000ff')('input: (color = 200, channel = 2, target = 33, max = undefined)'));
		console.log(chalk.hex(reversed)('returned color:', reversed));
		expect(reversed).to.equal('#1a1a51');
		done();
	});

	it('Should return black', (done) => {
		let reversed = lal.color.reverseSolo(255,0,0);
		console.log(chalk.hex('ccc')('input: (color = 255, channel = 0, target = 0, max = undefined)'));
		console.log(chalk.hex(reversed)('returned color:', reversed));
		expect(reversed).to.equal('#000000');
		done();
	});

	it('Should return dim red, limited by max param', (done) => {
		let reversed = lal.color.reverseSolo(0,0,33,100);
		console.log(chalk.hex('reversed')('input: (color = 0, channel = 0, target = 0, max = 100)'));
		console.log(chalk.hex(reversed)('returned color:', reversed));
		expect(reversed).to.equal('#640000');
		done();
	});
});

describe('Testing lal.color.blendLight (rounded)', () => {
	it('0% opacity black on white, should be 100 luma', (done) => {
		let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: 0}));
		console.log('Returned luma:', blended);
		expect(blended).to.equal(100);
		done();
	});

	it('50% opacity black on white, should be 50 luma', (done) => {
		let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: .5}));
		console.log('Returned luma:', blended);
		expect(blended).to.equal(50);
		done();
	});

	it('100% opacity black on white, should be 0 luma', (done) => {
		let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: 1}));
		console.log('Returned luma:', blended);
		expect(blended).to.equal(0);
		done();
	});
});

describe('Testing lal.is.image', () => {
	it('should return \'jpeg\' with the mimetype of \'image/jpeg\'', (done) => {
		let fileCheck = lal.is.image('image/jpeg');
		console.log(fileCheck);
		expect(fileCheck).to.equal('jpeg');
		done();
	});

	it('should return \'png\' with the mimetype of \'image/png\'', (done) => {
		let fileCheck = lal.is.image('image/png');
		console.log(fileCheck);
		expect(fileCheck).to.equal('png');
		done();
	});

	it('should return \'gif\' with the mimetype of \'image/gif\'', (done) => {
		let fileCheck = lal.is.image('image/gif');
		console.log(fileCheck);
		expect(fileCheck).to.equal('gif');
		done();
	});

	it('should return false with the mimetype of \'application/pdf\'', (done) => {
		let fileCheck = lal.is.image('application/pdf');
		console.log(fileCheck);
		expect(fileCheck).to.equal(false);
		done();
	});
});

describe('Testing lal.is.image', () => {
	it('should return \'txt\' with the mimetype of \'text/plain\'', (done) => {
		let fileCheck = lal.is.doc('text/plain');
		console.log(fileCheck);
		expect(fileCheck).to.equal('txt');
		done();
	});

	it('should return \'true\' with the mimetype of \'application/pdf\'', (done) => {
		let fileCheck = lal.is.doc('application/pdf');
		console.log(fileCheck);
		expect(fileCheck).to.equal('pdf');
		done();
	});

	it('should return \'doc\' with the mimetype of \'application/vnd.openxmlformats-officedocument.wordprocessingml.document\'', (done) => {
		let fileCheck = lal.is.doc('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
		console.log(fileCheck);
		expect(fileCheck).to.equal('doc');
		done();
	});

	it('should return false with the mimetype of \'image/gif\'', (done) => {
		let fileCheck = lal.is.doc('image/gif');
		console.log(fileCheck);
		expect(fileCheck).to.equal(false);
		done();
	});
});

describe('Testing lal.ellipsis', () => {
	let testStr = 'The quick brown fox jumps over the lazy dog';
	it('should shorten ' + testStr + ' to 10 characters', (done) => {
		let shortStr = lal.ellipsis(testStr,7);
		console.log(shortStr, shortStr.length);
		expect(shortStr.length).to.equal(10);
		done();
	});
	it('should shorten ' + testStr + ' to 18 characters', (done) => {
		let shortStr = lal.ellipsis(testStr,15);
		console.log(shortStr, shortStr.length);
		expect(shortStr.length).to.equal(18);
		done();
	});
});

describe('Testing lal.queryString', () => {
	let testObj = {
		one: 'red',
		two: 'green',
		three: 'blue',
		and: '-June 7'
	};

	it('should make object a query string', (done) => {
		let testQuery = lal.queryString(testObj);
		console.log(testQuery);
		expect(testQuery).to.equal('one=red&two=green&three=blue&and=-June%207');
		done();
	});

	it('should return empty string with no object input', (done) => {
		let testQuery = lal.queryString({});
		console.log(testQuery);
		expect(testQuery).to.equal('');
		done();
	});

});

describe('Testing lal.uno', () => {
	it('mono should euqal one', (done) => {
		let { mono } = lal.uno('one');
		console.log(mono);
		expect(mono).to.equal('one');
		done();
	});
	it('blue value should be undefined, red should equal one', (done) => {
		let { blue, red } = lal.uno({ red: 'one'},'blue');
		console.log(blue, red);
		expect(blue).to.equal(undefined);
		expect(red).to.equal('one');
		done();
	});

});

describe('Testing lal.objectsMatch', () => {
	const baseObj = { one: 'red', two: 'green'};
	const otherObj = { one: 'red', two: 'green'};
	it('objects should match', (done) => {
		let match = lal.objectsMatch(baseObj, otherObj);
		console.log(match);
		expect(match).to.equal(true);
		done();
	});
	it('objects should not match', (done) => {
		otherObj.three = 'blue';
		let match = lal.objectsMatch(baseObj, otherObj);
		console.log(match);
		expect(match).to.equal(false);
		done();
	});

});