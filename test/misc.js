module.exports = ({ expect, lal }) => {
	describe('Testing lal.isObject', () => {
		const anObject = {
			apple: 'one',
			banana: 'two',
			orange: 'three'
		};
		const anArray = ['one','two','three'];

		it('Should return true', (done) => {
			let checkObject = lal.isObject(anObject);
			expect(checkObject).to.be.true;
			console.log('Is an object? ' + checkObject);
			done();
		});
		it('Should return false', (done) => {
			let checkArray = lal.isObject(anArray);
			expect(checkArray).to.be.false;
			console.log('Is an object? ' + checkArray);
			done();
		});
	});

	describe('Testing lal.objecttor', () => {
		const objectArray = [
			{ title: 'Sandwich', price: 3.00, calories: 290},
			{ title: 'Pizza', price: 4.50, calories: 350},
			'I am a useless string',
			{ title: 'Hotdog', name: 'Dave\'s Famous Hotdog', price: 2.50, calories: 225},
			{ message: 'I am an untitled object'}
		];
		const objected = lal.objector(objectArray);
		console.log(objected);

		it('Should take an 5-length array with 4 objects and return an object with 4 keys', (done) => {
			let objectLength = Object.keys(objected).length;
			console.log('object length: ' + objectLength);
			expect(lal.isObject(objected)).to.be.true;
			expect(objectLength).to.equal(4);
			done();
		});

		it('Returned object should have a \'Pizza\' property', (done) => {
			console.log('Pizza object: ', objected.Pizza);
			expect(objected).to.have.property('Pizza');
			done();
		});

		it('Returned object should have a property named \'4\' derrived from the untitled object.', (done) => {
			console.log('Pizza object: ', objected['4']);
			expect(objected).to.have.property('4');
			done();
		});
	});
};