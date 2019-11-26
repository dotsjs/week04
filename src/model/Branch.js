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

  isSameFile = (fileA, fileB) => {
    const { name, date, state } = fileA;
    if (fileB.name === name && fileB.date === date && fileB.state === state) {
      return true;
    }
    return false;
  };
  newFile = name =>
    Object.assign(this, {
      workingDirectory: [...this.workingDirectory, new File(name)]
    });
  stagingFile = file => {
    file.setState("Staged");
    Object.assign(this, {
      workingDirectory: this.workingDirectory.filter(
        expect => !this.isSameFile(file, expect)
      ),
      stagingArea: [...this.stagingArea, file]
    });
  };

  getFile = name => this.workingDirectory.filter(file => file.name === name);
  getFiles = _ => ({
    workingDirectory: this.workingDirectory,
    stagingArea: this.stagingArea,
    gitRepository: this.gitRepository
  });
};
