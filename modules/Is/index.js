const validFiles = {
	image: ['image/jpeg','image/png','image/gif'],
	doc: ['text/plain','application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

const validate = (mimetype, type) => validFiles[type].includes(mimetype);

module.exports = {
	validFiles,
	image: (mimetype) => validate(mimetype, 'image'),
	doc: (mimetype) => validate(mimetype, 'doc')
};