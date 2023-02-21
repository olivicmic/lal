module.exports = ({ chai, expect, lal }) => {
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

	describe('Testing lal.is.objectID', () => {
		let goodID = lal.is.objectID('61e204e57abe817981347b1c');
		let badID = lal.is.objectID('Is a 24 character string');
		console.log('good id', goodID);
		console.log('bad ID', badID);

		it('should be a valid object ID', (done) => {
			expect(goodID).to.equal(true);
			done();
		});
		it('should be an invalid string', (done) => {
			expect(badID).to.equal(false);
			done();
		});
	});
};