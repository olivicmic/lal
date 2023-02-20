module.exports = (props, name = 'mono') => {
  const objCHeck = () => typeof props === 'object' && !(props instanceof Date) && props !== null;
  let unoString;
  if (!objCHeck()) unoString = props;
  return {
    [name]: unoString,
    ...props
  };
};