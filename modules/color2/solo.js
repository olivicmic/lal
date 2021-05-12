const chroma = require('chroma-js');

module.exports = (input) => chroma([0,0,0].map((old,i) => (i === input.channel) ? input.color : old)).hex();