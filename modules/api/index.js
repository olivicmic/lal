const axios = require('axios');
const queryString = require('../queryString');
const log = require('../log');
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
	if (debug) console.log('lal.api debug: starting', request);
	return axios(request)
		.then(response => {
			let content = response.data;
			let filtered = {
				...content,
				[collection]: content[collection] ? filterArr(content[collection]) : []
			};
			log(() => { if (debug) filtered.debug = true }, { lalDebug: 'success', filtered }, debug);
			resolve(filtered);
			return filtered;
		})
		.then(filtered => onSuccess(filtered))
		.catch(error => {
			let errObj = { ...error };
			log(() => { if (debug) errObj.debug = true }, { lalDebug: 'error', errObj }, debug);
			onError(errObj);
			reject(errObj);
		});
});