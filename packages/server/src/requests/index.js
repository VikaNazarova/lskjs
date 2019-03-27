import forEach from 'lodash/forEach';

const tryJSONparse = (str, defaultValue = str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return defaultValue;
  }
};

const getData = function (parseJson = false) {
  const params = {};
  Object.assign(params, this.params);
  Object.assign(params, this.body);
  if (parseJson) {
    forEach(this.query, (val, key) => {
      params[key] = tryJSONparse(val);
    });
  } else {
    Object.assign(params, this.query);
  }
  return params;
};

export default function (ctx) { // eslint-disable-line
  return {
    allParams: getData,
    getData,
  };
}