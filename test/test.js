'use strict';

var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	hexColorRegex = require('hex-color-regex'),
	lal = require('../index'),
	lorem = require('../lorem-ipsum'),
	monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('Testing lal.dateFormat', () => {
	it('should return a pretty date', (done) => {
		var date = lal.dateFormat(),
			dateArr = date.split('_'),
			time = new Date(),
			day = Number(dateArr[1]),
			year = Number(dateArr[2]),
			clock = dateArr[3].split('.'),
			hour = Number(clock[0]),
			minute = Number(clock[1]);

		console.log('date genereated: ' + date);
		console.log('Month: ' + dateArr[0]);
		console.log('Day: ' + day);
		console.log('Year: ' + year);
		console.log('Time: ' + clock[0] + ':' + clock[1]);
		expect(monthArr.indexOf(dateArr[0])).to.be.above(-1);
		expect(day).to.equal(time.getDate());
		expect(year).to.equal(time.getFullYear());
		assert.isNumber(hour, 'current hour');
		expect(hour).to.not.equal(NaN);
		assert.isNumber(minute, 'current minute');
		expect(minute).to.not.equal(NaN);
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

describe('Testing lal.hexSetCheck', () => {
	it('3rd value should be false', (done) => {
		var testArr = ['#89f', '#c7c7c7', '090cff', '#ddd'],
			colorTest = lal.hexSetCheck(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest[2]).to.equal(false);
		done();

	});

	it('No value should be false', (done) => {
		var testArr = ['#a9a9a9', '#810059', '#333', '#783455', '#699'],
			colorTest = lal.hexSetCheck(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest).to.not.include(false);
		done();
	});

	it('All should be false', (done) => {
		var testArr = [592288, 'red', true],
			colorTest = lal.hexSetCheck(testArr);

		console.log('test array:');
		console.log(testArr);
		console.log('result array:');
		console.log(colorTest);
		expect(colorTest).to.not.include(true);
		done();
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
		expect(arrList).to.equal(null);
		done();
	});
});