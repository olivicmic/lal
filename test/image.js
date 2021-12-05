module.exports = ({ expect, lal }) => {
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
};