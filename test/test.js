'use strict';

const chai = require('chai'),
	chalk = require('chalk'),
	color = require('./color.js'),
	image = require('./image.js'),
	lookupIP = require('./lookupIP.js'),
	misc = require('./misc.js'),
	text = require('./text.js'),
	tools = require('./tools.js'),
	web = require('./web.js');

const shared = {
	assert: chai.assert,
	chalk,
	expect: chai.expect,
	lal: require('../dist')
};

console.log(chalk.hex('FFBDBD').bold('LAL ▓▓▒▒░░'));
console.log(chalk.hex('FF00CC').bold('TEST START'));

// color(shared);
// image(shared);
lookupIP(shared);
// misc(shared);
// text(shared);
// tools(shared);
// web(shared);