const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

module.exports = ({ assert, chalk, expect, lal }) => {
	describe('Testing lal.dateFormat', () => {
		let date = new Date(),
			hr = date.getHours(),
			day = date.getDate(),
			year = date.getFullYear(),
			eve = (hr >= 12);
		console.log(
			'made at: ',
			monthArr[date.getMonth()],
			`${day}`,
			`${date.getFullYear()}`,
			`${eve ? hr - 12 : hr}:${date.getHours()} ${eve ? 'PM' : 'AM'}`
		);
		it('should return a pretty date', (done) => {
			let toTest = lal.dateFormat({date: date}),
				dateArr = toTest.split('_'),
				testDay = Number(dateArr[1]),
				testYEar = Number(dateArr[2]),
				clock = dateArr[3].split('.'),
				hour = Number(clock[0]),
				minute = Number(clock[1]);

			console.log(toTest);

			expect(monthArr.indexOf(dateArr[0])).to.be.above(-1);
			expect(testDay).to.equal(day);
			expect(testYEar).to.equal(year);
			assert.isNumber(hour, 'current hour');
			expect(hour).to.not.equal(NaN);
			assert.isNumber(minute, 'current minute');
			expect(minute).to.not.equal(NaN);
			done();
		});
		it('dateFormat should return equal values despite one instance receiving a date object and the other recieves a date string', (done) => {
			let dateA = lal.dateFormat(new Date('August 19, 1975 13:15:30'));
			let dateB = lal.dateFormat('August 19, 1975 13:15:30');
			console.log(chalk.hex('#ccffff')('date A:', dateA,'date B:', dateB));
			expect(dateA).to.equal(dateB);
			done();
		});
		it('should return a truncated date of 14 characters', (done) => {
			let shortDate = lal.dateFormat({truncate: true});
			console.log('pretty: ', shortDate, 'length: ', shortDate.length);
			expect(shortDate.length).to.equal(14);
			done();
		});
	});

	describe('Testing lal.byteFormat', () => {
		it('should return \'0 Bytes\'', (done) => {
			var result = lal.byteFormat();
			console.log('Bytes: none');
			console.log('Decimals: none');
			console.log('Returns: ' + result);
			expect(result).to.equal('0 Bytes');
			done();
		});

		it('should return \'0 Bytes\'', (done) => {
			var result = lal.byteFormat(0, 0);
			console.log('Bytes: 0');
			console.log('Decimals: 0');
			console.log('Returns: ' + result);
			expect(result).to.equal('0 Bytes');
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

	describe('Testing lal.generateUnique', () => {
		var wordSet = ['Apple', 'Donut', 'Banana', 'Pizza', 'Grape', 'Cherry', 'Taco', 'Grape', 'Sandiwch', 'Orange', 'Spaghetti', 'Salad', 'Sushi', 'Pho', 'Tangerine', 'Bacon'];

		it('Should generate a random 6 character string.', (done) => {
			var rando = lal.generateUnique();
			console.log(rando);
			expect(rando.length).to.equal(6);
			expect(typeof rando).to.equal('string');
			done();
		});

		it('Should generate a random 20 character string.', (done) => {
			var rando = lal.generateUnique({ charCount: 20 });
			console.log(rando);
			expect(rando.length).to.equal(20);
			expect(typeof rando).to.equal('string');
			done();
		});

		it('Should generate a random 20 character string with only \'abc\' characters.', (done) => {
			var rando = lal.generateUnique({
				charCount: 20,
				charSet: 'abc'
			});
			console.log(rando);
			expect(rando.length).to.equal(20);
			expect(rando.indexOf('d')).to.equal(-1);
			expect(rando.indexOf('9')).to.equal(-1);
			expect(rando.indexOf('!')).to.equal(-1);
			done();
		});

		it('Should be form new string from string array.', (done) => {
			var rando = lal.generateUnique({
				charCount: 10,
				charSet: wordSet
			});
			console.log(rando);
			expect(rando.length).to.be.above(30);
			console.log('\x07');
			done();
		});

		it('Should generate random string that does not match any in array.', (done) => {
			var testAgainst = ['mzw', 'pxk', 'kvz', '6rd', 'gqg', '2r4', 'abq'],
				rando = lal.generateUnique({
					charCount: 3,
					existing: testAgainst
				});

			console.log('Test set:');
			console.log(testAgainst);
			console.log(rando);
			expect(rando.length).to.equal(3);
			expect(testAgainst.indexOf(rando)).to.equal(-1);
			done();
		});

		it('Should generate random string with white space', (done) => {
			var rando = lal.generateUnique({
				charCount: 10,
				whiteSpace: true
			});

			console.log('Test set:');
			console.log(rando);
			expect(rando.charAt(1)).to.equal(' ');
			expect(rando.charAt(3)).to.equal(' ');
			expect(rando.charAt(5)).to.equal(' ');
			expect(rando.charAt(7)).to.equal(' ');
			expect(rando.charAt(9)).to.equal(' ');
			expect(rando.charAt(11)).to.equal(' ');
			expect(rando.charAt(13)).to.equal(' ');
			expect(rando.charAt(15)).to.equal(' ');
			expect(rando.charAt(17)).to.equal(' ');
			done();
		});

		it('Should generate a lorem ipsum string', (done) => {
			var rando = lal.generateUnique({
					charCount: 30,
					whiteSpace: true,
					preset: 'lorem',
					sentences: true
				}),
				randoSize = rando.length - 1,
				punctuations = ['.', '?', '!'];

			console.log('Test set:');
			console.log(rando);
			expect(rando.length).to.be.above(120);
			expect(punctuations.indexOf(rando.charAt(randoSize))).to.be.above(-1);
			done();
		});

		it('Should generate a valid random hex code', (done) => {
			var rando = lal.generateUnique({
				charCount: 6,
				preset: 'hex'
			});

			console.log('Test set:');
			console.log(rando);
			expect(rando.length).to.equal(6);
			done();
		});
	});

	describe('Testing lal.arrayList', () => {
		it('Should generate a list sentence string', (done) => {
			let arrList = lal.arrayList(['apple', 'banana', 'orange', 'watermelon']);
			console.log(arrList);
			expect(arrList).to.equal('apple, banana, orange and watermelon');
			done();
		});

		it('Should return a single word', (done) => {
			let arrList = lal.arrayList(['apple']);
			console.log(arrList);
			expect(arrList).to.equal('apple');
			done();
		});

		it('Should return null', (done) => {
			let arrList = lal.arrayList([]);
			console.log(arrList);
			expect(arrList).to.equal('');
			done();
		});
	});

	describe('Testing lal.random', () => {
		it('Should return a random number from 0 to 10', (done) => {
			let randomNum = lal.random();
			console.log('random made:', randomNum);
			expect(randomNum).to.be.above(-1);
			expect(randomNum).to.be.below(11);
			done();
		});
		it('Should return a random number from 0 to 300', (done) => {
			let randomNum = lal.random(300);
			console.log('random made:', randomNum);
			expect(randomNum).to.be.above(-1);
			expect(randomNum).to.be.below(301);
			done();
		});
	});

	describe('Testing lal.ellipsis', () => {
		let testStr = 'The quick brown fox jumps over the lazy dog';
		it('should shorten ' + testStr + ' to 10 characters', (done) => {
			let shortStr = lal.ellipsis(testStr,7);
			console.log(shortStr, shortStr.length);
			expect(shortStr.length).to.equal(10);
			done();
		});
		it('should shorten ' + testStr + ' to 18 characters', (done) => {
			let shortStr = lal.ellipsis(testStr,15);
			console.log(shortStr, shortStr.length);
			expect(shortStr.length).to.equal(18);
			done();
		});
	});
};