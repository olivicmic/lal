const isDefinedZero = require('./isDefinedZero');
module.exports = (way, def = 0) => isDefinedZero(way) ? way : def;