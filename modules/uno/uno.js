const is = require('../is');

module.exports = (props, name = 'mono') => {
	let isNotObj = !is.object(props);
	let unoString;
	if (isNotObj) unoString = props;
	return { ...isNotObj && { [name]: unoString }, ...props };
};