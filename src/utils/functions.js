import config from 'config';

const customFunctions = {};

customFunctions.isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

customFunctions.typeOf = (value) => {
  let s = typeof value;
  /* istanbul ignore next */
  if (s === 'object') {
    if (value) {
      /* istanbul ignore next */
      if (value instanceof Array) {
        s = 'array';
      }
    } else {
      s = 'null';
    }
  }
  return s;
};

/* istanbul ignore next */
customFunctions.checkAndSwitchEnvironment = () => {
  let port = null;
  switch (process.env.NODE_ENV) {
    case 'test':
      port = process.env.TESTPORT || 4555;
      break;
    case 'development':
      port = process.env.DEVELOPMENTPORT || 7500;
      break;
    default:
      port = process.env.PORT || 6600;
  }
  return port;
};

export default customFunctions;
