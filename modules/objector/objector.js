const is = require('../is');

module.exports = (input) => {
	let newObject = {};
	if (Array.isArray(input)) {
		for (let index in input) {
			if (is.object(input[index])) {
				newObject[input[index].name || input[index].title || index] = input[index];
			}
		};
		return newObject;
	}
	return input;
};