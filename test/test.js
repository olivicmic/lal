'use strict';

var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	lal = require('../index'),
	monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('Testing lal.dateFormat', function () {
	it('should return a pretty date', function (done) {
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

describe('Testing lal.byteFormat', function () {
	it('should return \'0 Byte\'', function (done) {
		var result = lal.byteFormat();
		console.log('Bytes: none');
		console.log('Decimals: none');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Byte');
		done();
	});

	it('should return \'0 Byte\'', function (done) {
		var result = lal.byteFormat(0, 0);
		console.log('Bytes: 0');
		console.log('Decimals: 0');
		console.log('Returns: ' + result);
		expect(result).to.equal('0 Byte');
		done();
	});

	it('should return \'347 Bytes\'', function (done) {
		var result = lal.byteFormat(347);
		console.log('Bytes: 347');
		console.log('Returns: ' + result);
		expect(result).to.equal('347 Bytes');
		done();
	});

	it('should return \'56.7 KB\'', function (done) {
		var result = lal.byteFormat(56739, 1);
		console.log('Bytes: 56739');
		console.log('Decimals: 1');
		console.log('Returns: ' + result);
		expect(result).to.equal('56.7 KB');
		done();
	});

	it('should return \'9.81 MB\'', function (done) {
		var result = lal.byteFormat(9812734, 2);
		console.log('Bytes: 9812734');
		console.log('Decimals: 2');
		console.log('Returns: ' + result);
		expect(result).to.equal('9.81 MB');
		done();
	});

	it('should return \'75.20139417 GB\'', function (done) {
		var result = lal.byteFormat(75201394166, 8);
		console.log('Bytes: 75201394166');
		console.log('Decimals: 8');
		console.log('Returns: ' + result);
		expect(result).to.equal('75.20139417 GB');
		done();
	});
});