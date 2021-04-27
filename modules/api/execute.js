const axios = require('axios');
module.exports = ({debug, delay, filter, itemNames, onSuccess, onError, resolve, reject, request }) => {
	const collection = itemNames || 'items';
	const filterArr = (arr) => arr.filter(filter);
	if (debug) console.log('lal.api debug', request);
	setTimeout(() => axios(request)
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
		})
	, delay);
};