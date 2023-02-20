module.exports = obj => {
  let str = [];
  for (let p in obj) if (obj.hasOwnProperty(p) && obj[p]) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
  return str.join('&');
};