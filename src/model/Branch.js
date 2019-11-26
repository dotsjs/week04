const File = require("./File");
module.exports = Branch = class {
  constructor(name, parent) {
    Object.assign(this, {
      name,
      parent,
      workingDirectory: [],
      stagingArea: [],
      gitRepository: [],
      log: []
    });
  }
  newFile = name =>
    Object.assign(this, {
      workingDirectory: [...this.workingDirectory, new File(name)]
    });
};
