module.exports = (toDo = () => {}, log, debug) => {
  if (debug) console.log(log);
  toDo();
};