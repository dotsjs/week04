module.exports = Log = class {
  constructor(message) {
    Object.assign(this, {
      id: Math.ceil(Date.now() * Math.random()).toString(18),
      message,
      date: new Date()
    });
  }
};
