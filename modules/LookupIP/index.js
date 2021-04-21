const axios = require('axios');
const api = require('../api');

const LookupIP = (input, output) => {
	let lookup;
	if (!input.ip) return output({ error: 'No IP provided' }, null);
	if (!input.host || input.host === 'ip-api') lookup = 'http://ip-api.com/json/' + input.ip;
	else if (input.host === 'ipapi') lookup = 'https://ipapi.co/' + input.ip + '/json';
	else if (input.host === 'extreme') lookup = 'http://extreme-ip-lookup.com/json/' + input.ip;
	else if (input.host === 'ipinfo') lookup = 'https://ipinfo.io/' + input.ip + '/json';
	else return output({ error: 'Invalid host' }, null);

	api({ route: lookup })
		.then(response => output(null, response))
		.catch(errors => output(errors, null));
};

module.exports = LookupIP;