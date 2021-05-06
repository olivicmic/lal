module.exports = (props, name = 'mono') => {
	const objCHeck = () => (typeof props === 'object') && !(props instanceof Date) && (props !== null);
	const { ...rest } = props;
	let unoString;
	if (!objCHeck()) unoString = props;
	return { [name]: unoString, ...rest };
};