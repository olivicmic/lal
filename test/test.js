'use strict';

var chai = require('chai'),
	expect = chai.expect,
	assert = chai.assert,
	lal = require('../index'),
	monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

describe('Testing Lal', function () {
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