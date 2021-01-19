const lorem = require('../../resources/lorem-ipsum'),
	random = require('../Random');

const isEven = (input) => input % 2 === 0;

const generate = (input) => {
	var string = '',
		chance = 9,
		capNext = false,
		randomIndex = () => random(input.charSet.length - 1),
		doPeriod = () => random(chance),
		modString = () => input.charSet[randomIndex()];

	var punctuation = () => {
		let puncRand = () => random(13);
		if (puncRand() <= 10) return '.';
		else if (puncRand() <= 11) return '!';
		else return '?';
	};

	if (Array.isArray(input.charSet)) {
		for (var i = 0; i < input.charCount; i++) {
			if (input.whiteSpace === true && !isEven(i)) string += ' ';
			else if (input.whiteSpace === true) {
				let glyph = modString();
				if (input.sentences && i === 0 || capNext === true) {
					string += glyph.charAt(0).toUpperCase() + glyph.slice(1);
					if (i === input.charCount - 2) string += punctuation();
					capNext = false;
				} else {
					string += modString();
					if (input.sentences && doPeriod() === chance - 1 || i === input.charCount - 2) {
						string += punctuation();
						capNext = true;
					} else if (input.sentences && doPeriod() === chance - 1) string += ',';
				}
			} else {
				string += modString();
			}
		}
	} else {
		for (var i = 0; i < input.charCount; i++) {
			if (input.whiteSpace === true && !isEven(i)) string += ' ';
			else string += input.charSet.charAt(randomIndex());
		}
	}

	if (input.sentences === true) return string.trim();
	return string;
};

const GenerateUnique = (input) => {
	if (!input) input = {};
	if (!input.existing) input.existing = [];
	if (!input.charCount) input.charCount = 6;
	if (input.preset === 'lorem ipsum') input.charSet = lorem.ipsum();
	if (input.preset === 'hex') input.charSet = '0123456789abcdef';
	if (input.whiteSpace) input.charCount *= 2;
	if (!input.preset && !input.charSet || typeof input.charSet != 'string' && !Array.isArray(input.charSet))
		input.charSet = '23456789abdegjkmnpqrvwxyz';

	var id = '',
		retries = 0,
		uniqueRetries = 9999;

	if (input.existing.length > 0) {
		while (!id && retries < uniqueRetries) {
			id = generate(input);
			if (input.existing.indexOf(id) !== -1) {
				id = null;
				retries++;
			}
		}
	} else id = generate(input);

	return id;
};

module.exports = GenerateUnique;