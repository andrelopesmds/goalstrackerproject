const keys = ['title', 'body'];

const createPayload = (obj) => {
  validateObj(obj);

  const payload = JSON.stringify(obj);

  return payload;
};

const validateObj = (obj) => {
  keys.forEach((key) => {
    if (!obj[key]) {
      throw new Error(`Event object is missing value. Object: ${JSON.stringify(obj)}`);
    }
  });
};

module.exports = {
  createPayload,
};
