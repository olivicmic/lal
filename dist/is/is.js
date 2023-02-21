const validFiles = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  doc: ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};
const short = {
  image: ['jpeg', 'png', 'gif'],
  doc: ['txt', 'pdf', 'doc']
};
const validate = (mimetype, type) => {
  let index = validFiles[type].indexOf(mimetype);
  return index >= 0 ? short[type][index] : false;
};
const is = (...a) => {
  let onMatch;
  let matched;
  let match = a.find((b, i) => {
    if (i === 0 && b instanceof Function) {
      onMatch = b;
    } else if (b || b === 0) {
      matched = true;
      return true;
    }
    return false;
  });
  return matched && onMatch ? onMatch(match) : match;
};
const definedZero = way => way || way === 0;
module.exports = {
  default: is,
  definedZero,
  doc: mimetype => validate(mimetype, 'doc'),
  even: input => input % 2 === 0,
  image: mimetype => validate(mimetype, 'image'),
  is,
  object: item => item instanceof Object && !(item instanceof Array),
  objectID: item => (item.match(/^[0-9a-fA-F]{24}$/) || []).length > 0,
  definedOr: (way, def = 0) => definedZero(way) ? way : def,
  validFiles
};