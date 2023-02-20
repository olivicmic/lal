const axios = require('axios');
const api = require('../api');

module.exports = ({ host, ip }, output, debug) => {
	let lookup;
	if (!ip) return output({ error: 'No IP provided' }, null);
	if (!host || host === 'ip-api') lookup = 'http://ip-api.com/json/' + ip;
	else if (host === 'ipapi') lookup = 'https://ipapi.co/' + ip + '/json';
	else if (host === 'extreme') lookup = 'http://extreme-ip-lookup.com/json/' + ip;
	else if (host === 'ipinfo') lookup = 'https://ipinfo.io/' + ip + '/json';
	else return output({ error: 'Invalid host' }, null);

	api({ url: lookup, debug })
		.then(response => output(null, response.data))
		.catch(errors => output(errors, null));
};