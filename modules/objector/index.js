const isObject = require('../isObject');

module.exports = (array) => {
	let newObject = {};
	for (let index in array) {
		if (isObject(array[index])) {
			newObject[array[index].title || index] = array[index];
		}
	};
	return newObject;
};