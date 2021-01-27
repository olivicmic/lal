const chroma = require('chroma-js');

module.exports = (input) => chroma.average(input.colors, 'lch',[input.opacity, 1 - input.opacity]).lch()[0];