const axios = require('axios');
const queryString = require('../queryString');

module.exports = ({ auth, contentType = 'application/json', data, debug, method = 'get', route = '', queries }) => new Promise((resolve, reject) => {
	const encoded = queryString(queries);
	const query = encoded.length > 0 ? '/?' + encoded : '';
	const setAuth = () => auth ? { 'Authorization': 'Bearer ' + auth } : null;
	const request = {
		data: data,
		method: method,
		url: route + query,
		headers: {
			...setAuth(),
			'content-type': contentType,
		}
	};
	if (debug) console.log('lal.api debug', request);
	axios(request)
		.then(response => resolve(response.data))
		.catch(error => reject(error));
});