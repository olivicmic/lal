const chroma = require('chroma-js');
const average = require('./average');

module.exports = ({ceiling, channel = 0, color, floor, range = 150}) => {
	let rgb = chroma(color).rgb();
	let soloRGB = rgb[channel];
	let value = average(rgb);
	let lift = (floor && floor < range) ? (range - (floor * ((255 - soloRGB)/255))) : 149;
	let limit = (ceiling && ceiling > 85) ? ceiling : 255;

	return chroma(rgb)
    	.saturate((soloRGB / 250)*3)
    	.brighten((limit - value) / lift)
    	.hex();
};