const chroma = require('chroma-js');
const average = require('./average');

module.exports = (setup) => {
	let rgb = chroma(setup.color).rgb();
	let value = average(rgb);
	return {
		accent: (value < 65) ? chroma(rgb).brighten(2).hex() : chroma(rgb).darken(2.75).hex(),
		bright: chroma(rgb).brighten((255 - value)/150).hex()
	};
};