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
module.exports = {
  validFiles,
  image: mimetype => validate(mimetype, 'image'),
  doc: mimetype => validate(mimetype, 'doc')
};