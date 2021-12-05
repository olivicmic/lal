'use strict';

const chai = require('chai'),
	chalk = require('chalk'),
	color = require('./color'),
	image = require('./image'),
	lorem = require('../resources/lorem-ipsum'),
	lookupIP = require('./lookupIP'),
	misc = require('./misc'),
	text = require('./text'),
	tools = require('./tools'),
	web = require('./web');

const shared = {
	assert: chai.assert,
	chalk,
	expect: chai.expect,
	lal: require('../index')
};

console.log(chalk.hex('FFBDBD').bold('LAL ▓▓▒▒░░'));
console.log(chalk.hex('FF00CC').bold('TEST START'));

//color(shared);
//image(shared);
//lookupIP(shared);
//misc(shared);
//text(shared);
//tools(shared);
web(shared);