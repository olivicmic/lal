module.exports = ({ chalk, expect, lal }) => {
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
};