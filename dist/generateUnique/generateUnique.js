const ipsum = require('../ipsum');
const isEven = require('../isEven');
const random = require('../random');
const punctuation = () => random(13) <= 10 ? '.' : random(13) <= 11 ? '!' : '?';
const punctuate = (chance, i, capNext, stringEnd, modString) => {
  let doPeriod = () => random(chance),
    addPunc = doPeriod() === chance - 1,
    glyph = modString;
  return i === 0 || capNext === true ? [stringEnd ? punctuation() : glyph.charAt(0).toUpperCase() + glyph.slice(1), false] : addPunc || stringEnd ? [modString + punctuation(), true] : [modString, false];
};
const generate = ({
  charCount,
  charSet,
  sentences,
  whiteSpace
}) => {
  let string = '',
    chance = 9,
    capNext = false,
    randomIndex = () => random(charSet.length - 1),
    doPeriod = () => random(chance),
    modString = () => charSet[randomIndex()];
  if (Array.isArray(charSet)) {
    for (let i = 0; i < charCount; i++) {
      if (whiteSpace && !isEven(i)) string += ' ';else if (sentences && whiteSpace) {
        let [addition, newNext] = punctuate(chance - 1, i, capNext, i === charCount - 2, modString());
        string += addition;
        capNext = newNext;
      } else string += modString();
    }
  } else {
    for (let i = 0; i < charCount; i++) {
      if (whiteSpace && !isEven(i)) string += ' ';else string += charSet.charAt(randomIndex());
    }
  }
  return sentences ? string.trim() : string;
};
const presets = {
  hex: '0123456789abcdef',
  lorem: ipsum
};
const GenerateUnique = input => {
  const {
    charCount = 6,
    charSet,
    existing = [],
    preset,
    whiteSpace,
    ...rest
  } = input || {};
  const newConfig = {
    charCount: whiteSpace ? charCount * 2 : charCount,
    charSet: preset ? presets[preset] : charSet || '23456789abdegjkmnpqrvwxyz',
    whiteSpace,
    ...rest
  };
  let id = '',
    retries = 0,
    uniqueRetries = 9999;
  if (existing.length > 0) {
    while (!id && retries < uniqueRetries) {
      id = generate(newConfig);
      if (existing.indexOf(id) !== -1) {
        id = null;
        retries++;
      }
    }
  } else id = generate(newConfig);
  return id;
};
module.exports = GenerateUnique;