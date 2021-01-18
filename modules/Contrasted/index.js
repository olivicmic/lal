const Chroma = require('chroma-js');
const IsolateChannel = require('../IsolateChannel');
const average = (arr) => (arr[0] + arr[1] + arr[2]) / 3; // arr = rgb array

module.exports = (setup) => {
	let isolated = (setup.channel != null); 
	let rgb = Chroma(setup.color).rgb();
	let value = average(rgb);
	if (isolated) return Chroma(rgb).saturate((rgb[setup.channel] / 250)*3).brighten((255 - value)/150).hex();
	return {
		accent: (value < 65) ? Chroma(rgb).brighten(2).hex() : Chroma(rgb).darken(2.75).hex(),
		tone: Chroma(rgb).brighten((255 - value)/150).hex()
	};
};