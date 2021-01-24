const reverse = require('./reverse');
const chroma = require('chroma-js');

module.exports = (val = 0, chan = 0, target = 0) =>
	chroma([0,0,0].map((old, i) => {
		if (i === chan) return reverse(val, target);
		return (val / 255) * target;
	})).hex();