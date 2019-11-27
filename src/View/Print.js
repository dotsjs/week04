module.exports = Print = class {
  constructor() {
    Object.assign(this, { print: console.log });
  }
};
