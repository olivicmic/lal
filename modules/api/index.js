const axios = require('axios');
const queryString = require('../queryString');
const objector = require('../objector');
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
		objectify,
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
	const filterArr = (unfilteredArr) => unfilteredArr.filter(filter);
	const objected = (unobjected) => objectify ? objector(unobjected) : unobjected;
	if (debug) console.log('lal.api debug: starting', request);
	return axios(request)
		.then(response => {
			let content = response.data;
			let filtered = {
				...content,
				[collection]: objected(content[collection] ? filterArr(content[collection]) : [])
			};
			log(() => { if (debug) filtered.debug = true }, { lalDebug: 'success', response, filtered }, debug);
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