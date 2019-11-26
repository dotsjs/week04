module.exports = Branch = class {
  constructor(name) {
    Object.assign(this, {
      name,
      parent: null,
      workingDirectory: [],
      stagingArea: [],
      gitRepository: [],
      log: []
    });
  }
};
