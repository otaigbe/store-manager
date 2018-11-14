const customFunctions = {};


customFunctions.isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

customFunctions.typeOf = (value) => {
  let s = typeof value;
  if (s === 'object') {
    if (value) {
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }
  return s;
};

export default customFunctions;
