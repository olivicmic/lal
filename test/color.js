module.exports = ({ chalk, expect, lal }) => {
	describe('Testing lal.color.solo', () => {
		it('Should return max red only hex', (done) => {
			let isolateRed = lal.color.solo({ channel: 0, color: 255});
			console.log(chalk.hex(isolateRed)('returned color:', isolateRed));
			expect(isolateRed).to.equal('#ff0000');
			done();
		});
		it('Should return partial green only hex', (done) => {
			let isolateGreen = lal.color.solo({ channel: 1, color: 128});
			console.log(chalk.hex(isolateGreen)('returned color:', isolateGreen));
			expect(isolateGreen).to.equal('#008000');
			done();
		});
		it('Should return partial blue only hex', (done) => {
			let isolateBlue = lal.color.solo({ channel: 2, color: 73});
			console.log(chalk.hex(isolateBlue)('returned color:', isolateBlue));
			expect(isolateBlue).to.equal('#000049');
			done();
		});
		it('Should return black due to invalid channel', (done) => {
			let isolateErr = lal.color.solo({ channel: 7, color: 99});
			console.log(chalk.hex(isolateErr)('returned color:', isolateErr));
			expect(isolateErr).to.equal('#000000');
			done();
		});
	});

	describe('Testing lal.color.accent', () => {
		it('Should return an object with accent and tone hex colors', (done) => {
			let contrastObj = lal.color.accent({color: '#810059'});
			console.log(contrastObj);
			let contrastArr = [];
			for (let color in contrastObj) {
				if (contrastObj[color]) contrastArr.push(contrastObj[color]);
			};
			let conTest = lal.color.checkHexs(contrastArr);
			expect(conTest[0]).to.equal(true);
			expect(conTest[1]).to.equal(true);
			done();
		});
	});

	describe('Testing lal.color.illuminate', () => {
		it('Should return a new hex color', (done) => {
			let contrastColor = lal.color.illuminate({color: '#ff0000', channel: 0});
			console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
			expect(contrastColor).to.equal('#ff623c');
			done();
		});
		it('Should return a new hex color with ceiling param', (done) => {
			let contrastColor = lal.color.illuminate({color: '#ff0000', channel: 0, ceiling: 200});
			console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
			expect(contrastColor).to.equal('#ff4c2b');
			done();
		});
		it('Should return a new hex color with floor param', (done) => {
			let contrastColor = lal.color.illuminate({color: '#000000', channel: 0, floor: 66});
			console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
			expect(contrastColor).to.equal('#838383');
			done();
		});
		it('Should return a new hex color with range param', (done) => {
			let contrastColor = lal.color.illuminate({color: '#800000', channel: 0, range: 255});
			console.log(chalk.hex(contrastColor)('returned color:', contrastColor));
			expect(contrastColor).to.equal('#e8583c');
			done();
		});
	});

	describe('Testing lal.color.checkHexs', () => {
		it('3rd value should be false', (done) => {
			var testArr = ['#89f', '#c7c7c7', '090cff', '#ddd'],
				colorTest = lal.color.checkHexs(testArr);

			console.log('test array:');
			console.log(testArr);
			console.log('result array:');
			console.log(colorTest);
			expect(colorTest[2]).to.equal(false);
			done();

		});

		it('No value should be false', (done) => {
			var testArr = ['#a9a9a9', '#810059', '#333', '#783455', '#699'],
				colorTest = lal.color.checkHexs(testArr);

			console.log('test array:');
			console.log(testArr);
			console.log('result array:');
			console.log(colorTest);
			expect(colorTest).to.not.include(false);
			done();
		});

		it('All should be false', (done) => {
			var testArr = [592288, 'red', true],
				colorTest = lal.color.checkHexs(testArr);

			console.log('test array:');
			console.log(testArr);
			console.log('result array:');
			console.log(colorTest);
			expect(colorTest).to.not.include(true);
			done();
		});
	});

	describe('Testing lal.color.reverseSolo (uses lal.color.reverse) ', () => {

		it('Should return red', (done) => {
			let reversed = lal.color.reverseSolo();
			console.log(chalk.hex('ff0000')('input: none (value, channel, target, & max undefined)'));
			console.log(chalk.hex(reversed)('returned color:', reversed));
			expect(reversed).to.equal('#ff0000');
			done();
		});

		it('Should return a shade of green via channel param', (done) => {
			let reversed = lal.color.reverseSolo(195,1);
			console.log(chalk.hex('00ff00')('input: (value = 195, channel = 1, target & max = undefined)'));
			console.log(chalk.hex(reversed)('returned color:', reversed));
			expect(reversed).to.equal('#003c00');
			done();
		});

		it('Should return a dim blue', (done) => {
			let reversed = lal.color.reverseSolo(200,2,33);
			console.log(chalk.hex('0000ff')('input: (color = 200, channel = 2, target = 33, max = undefined)'));
			console.log(chalk.hex(reversed)('returned color:', reversed));
			expect(reversed).to.equal('#1a1a51');
			done();
		});

		it('Should return black', (done) => {
			let reversed = lal.color.reverseSolo(255,0,0);
			console.log(chalk.hex('ccc')('input: (color = 255, channel = 0, target = 0, max = undefined)'));
			console.log(chalk.hex(reversed)('returned color:', reversed));
			expect(reversed).to.equal('#000000');
			done();
		});

		it('Should return dim red, limited by max param', (done) => {
			let reversed = lal.color.reverseSolo(0,0,33,100);
			console.log(chalk.hex('reversed')('input: (color = 0, channel = 0, target = 0, max = 100)'));
			console.log(chalk.hex(reversed)('returned color:', reversed));
			expect(reversed).to.equal('#640000');
			done();
		});
	});

	describe('Testing lal.color.blendLight (rounded)', () => {
		it('0% opacity black on white, should be 100 luma', (done) => {
			let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: 0}));
			console.log('Returned luma:', blended);
			expect(blended).to.equal(100);
			done();
		});

		it('50% opacity black on white, should be 50 luma', (done) => {
			let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: .5}));
			console.log('Returned luma:', blended);
			expect(blended).to.equal(50);
			done();
		});

		it('100% opacity black on white, should be 0 luma', (done) => {
			let blended = Math.round(lal.color.blendLight({colors: ['#000','#fff'], opacity: 1}));
			console.log('Returned luma:', blended);
			expect(blended).to.equal(0);
			done();
		});
	});
};