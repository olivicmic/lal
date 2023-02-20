const axios = require('axios');
const log = require('../log');
const uno = require('../uno');
module.exports = props => new Promise((resolve, reject) => {
  const {
    auth,
    contentType,
    debug,
    filter = f => f,
    mono,
    onError = () => {},
    onSuccess = () => {},
    url,
    ...rest
  } = uno(props);
  const request = {
    ...rest,
    url: mono || url,
    headers: {
      ...(auth && {
        'Authorization': 'Bearer ' + auth
      }),
      'content-type': contentType || 'application/json'
    }
  };
  if (debug) console.log(`lal.api debug at ${debug.location || ''}: starting`, request);
  const recieve = (toDo, inputObj, extra = () => {}, message) => {
    let filtered = {
      ...filter(inputObj),
      ...(debug && {
        debug: true
      })
    };
    log(undefined, {
      lalDebug: message,
      inputObj,
      filtered
    }, debug);
    toDo(filtered);
    extra(filtered);
  };
  return axios(request).then(response => recieve(resolve, response, onSuccess, 'success')).catch(error => recieve(reject, error || {
    message: 'An error occured.'
  }, onError, 'error'));
});