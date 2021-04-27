const execute = require('./execute');
const queryString = require('../queryString');

module.exports = ({
	auth, // jwt auth access token
	contentType = 'application/json', // request content type
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
	const request = {
		data: data,
		method: method,
		url: route + query,
		headers: {
			...auth ? { 'Authorization': 'Bearer ' + auth } : null,
			'content-type': contentType,
		}
	};
	return execute({ debug, delay, filter, itemNames, onSuccess, onError, resolve, reject, request });
});