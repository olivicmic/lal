module.exports = (input) => (input.length <= 0) ? null :
	(input.length === 1) ? input[0] :
		input.slice(0, input.length - 1).join(', ') + ' and ' + input.slice(input.length - 1);