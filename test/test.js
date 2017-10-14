'use strict';

var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	lal = require('../index'),
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
	it('should return \'0 Byte\'', (done) => {
		var result = lal.byteFormat();
		console.log('Bytes: none');
		console.log('Decimals: none');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Byte');
		done();
	});

	it('should return \'0 Byte\'', (done) => {
		var result = lal.byteFormat(0, 0);
		console.log('Bytes: 0');
		console.log('Decimals: 0');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Byte');
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

	it('should return object with country_code property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'freegeoip' }, (err, result) => {
			if (err) return done(err);
			console.log('http://freegeoip.net/json/' + testIP);
			console.log(result);
			expect(result.country_code).to.equal('US');
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