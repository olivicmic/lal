const hexColorRegex = require('hex-color-regex');

module.exports = (arr) => arr.map((color) => hexColorRegex({ strict: true}).test(color));