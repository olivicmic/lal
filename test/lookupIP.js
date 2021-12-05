module.exports = ({ expect, lal }) => describe('Testing lal.lookupIP', () => {
	var testIP = '208.80.152.201';

	it('should return object with status property with \'success\' value', (done) => {
		lal.lookupIP({ ip: testIP }, (err, result) => {
			if (err) return done(err);
			console.log('http://ip-api.com/json/' + testIP);
			console.log(result);
			expect(result.status).to.equal('success');
			done();
		});
	});

	it('should return object with country property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'ipapi' }, (err, result) => {
			if (err) return done(err);
			console.log('https://ipapi.co/' + testIP +'/json/');
			console.log(result);
			expect(result.country).to.equal('US');
			done();
		});
	});

	it('should return object with countryCode property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'extreme' }, (err, result) => {
			if (err) return done(err);
			console.log('http://extreme-ip-lookup.com/json/' + testIP);
			console.log(result);
			expect(result.countryCode).to.equal('US');
			done();
		});
	});

	it('should return object with country property with \'US\' value', (done) => {
		lal.lookupIP({ ip: testIP, host: 'ipinfo' }, (err, result) => {
			if (err) return done(err);
			console.log('https://ipinfo.io/' + testIP + '/json');
			console.log(result);
			expect(result.country).to.equal('US');
			done();
		});
	});
});