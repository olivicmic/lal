const axios = require('axios');
const queryString = require('../queryString');

module.exports = ({
	auth, // jwt auth access token
	contentType = 'application/json',
	data, // post/put/patch data object
	debug, // if true log rest details and sucess/error respone
	delay, // delay in milliseconds
	filter = f => f, // pass a array filter function to the main collection
	itemNames, // name the main collection, otherwise it is 'items'
	method = 'get', // rest method type
	onError = () => {}, // a function that will execute if an error occurs
	onSuccess = () => {}, // a function that will excute after a succesful request
	route = '', // full url to request
	queries // an object consisting of strings to be encoded and appended to the url
}) => new Promise((resolve, reject) => {
	const encoded = queryString(queries);
	const query = encoded.length > 0 ? '/?' + encoded : '';
	const setAuth = () => auth ? { 'Authorization': 'Bearer ' + auth } : null;
	const filterArr = (arr) => arr.filter(filter);
	const collection = itemNames || 'items';
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
	,delay);
});