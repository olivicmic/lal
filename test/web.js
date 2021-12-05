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
	describe('Testing lal.api', () => {
		lal.api({ 
			url: 'https://api.vics.pics/v1/resources/test-collection',
			itemNames: 'characters',
			objectify: true,
			onSuccess: res => console.log('🤩', res) })
		.then(response => output(null, response))
		.catch(errors => console.log(errors, '😡'));
	});
};