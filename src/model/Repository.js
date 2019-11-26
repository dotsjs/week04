module.exports = Repository = class {
  constructor(name) {
    Object.assign(this, {
      name,
      head: null,
      branchList: []
    });
  }
};
