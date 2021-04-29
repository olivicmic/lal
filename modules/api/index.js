const axios = require('axios');
const queryString = require('../queryString');
const uno = require('../uno');

module.exports = (props) => new Promise((resolve, reject) => {
	const {
		auth,
		contentType = 'application/json',
		debug,
		filter = f => f,
		itemNames,
		mono,
		onError = () => {},
		onSuccess = () => {},
		url,
		...rest
	} = uno(props);

	const request = {
		...rest,
		url: mono || url,
		headers: {
			...auth ? { 'Authorization': 'Bearer ' + auth } : null,
			'content-type': contentType,
		}
	};
	const collection = itemNames || 'items';
	const filterArr = (arr) => arr.filter(filter);
	if (debug) console.log('lal.api debug', request);
	axios(request)
		.then(response => {
			let content = response.data;
			let filtered = {
				...content,
				[collection]: content[collection] ? filterArr(content[collection]) : []
			};
			if (debug) console.log('lal.api debug success', filtered);
			onSuccess(filtered);
			resolve(filtered);
		})
		.catch(error => {
			if (debug) console.log('lal.api debug', error);
			onError(error);
			reject(error);
		});
});