module.exports = (set = [], pre = '', one = '') => ((one ? one + ' ' : '') + set.map((itm,i) =>
	Array.isArray(itm) ? itm[0] && itm[1] ? ' ' + pre + itm[0] : '' : itm ? ' ' + itm : ''
).join('')).trim();
