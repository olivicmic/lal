module.exports = ({ chai, expect, lal }) => {
	console.log('hhhhhheeee');
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

	describe('Testing lal.isObjectID', () => {
		let goodID = lal.isObjectID('61e204e57abe817981347b1c');
		let badID = lal.isObjectID('Is a 24 character string');
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
	/*
	describe('Testing lal.api', () => {
		lal.api({
			url: 'https://api.vics.pics/v1/resources/test-collection',
			itemNames: 'characters',
			objectify: true,
			onSuccess: res => console.log('🤩', res) })
			.then(response => done())
			.catch(errors => console.log(errors, '😡'));
	}); */
};