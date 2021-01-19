const chroma = require('chroma-js');
const IsolateChannel = require('../IsolateChannel');
const average = (arr) => (arr[0] + arr[1] + arr[2]) / 3; // arr = rgb array

module.exports = (setup) => {
	let isolated = (setup.channel != null);
	let rgb = chroma(setup.color).rgb();
	let value = average(rgb);
	if (isolated) return chroma(rgb).saturate((rgb[setup.channel] / 250)*3).brighten((255 - value)/150).hex();
	return {
		accent: (value < 65) ? chroma(rgb).brighten(2).hex() : chroma(rgb).darken(2.75).hex(),
		bright: chroma(rgb).brighten((255 - value)/150).hex()
	};
};