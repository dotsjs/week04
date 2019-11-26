const File = require("./File");
const Log = require("./Log");
module.exports = Branch = class {
  constructor(name, parent) {
    Object.assign(this, {
      name,
      parent,
      workingDirectory: [],
      stagingArea: [],
      gitRepository: [],
      logs: []
    });
  }

  commit = message => {
    const log = new Log(message);
    Object.assign(this, {
      stagingArea: [],
      gitRepository: [...this.gitRepository, ...this.stagingArea],
      logs: [...this.logs, log]
    });

    return log;
  };
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

  editFile = file => {
    file.setState("Modified");
    if (!this.inWorkingDirectory(file)) {
      Object.assign(this, {
        workingDirectory: [...this.workingDirectory, file],
        stagingArea: this.stagingArea.filter(
          expect => !this.isSameFile(file, expect)
        ),
        gitRepository: this.gitRepository.filter(
          expect => !this.isSameFile(file, expect)
        )
      });
    }
  };
  stagingFile = file => {
    file.setState("Staged");
    Object.assign(this, {
      workingDirectory: this.workingDirectory.filter(
        expect => !this.isSameFile(file, expect)
      ),
      stagingArea: [...this.stagingArea, file]
    });
  };

  inWorkingDirectory = file =>
    this.workingDirectory.some(expect => this.isSameFile(file, expect));

  getFile = name => this.getFiles().filter(file => file.name === name);

  getFiles = _ => Object.values(this.getStatus()).flat();

  getStatus = _ => ({
    workingDirectory: this.workingDirectory,
    stagingArea: this.stagingArea,
    gitRepository: this.gitRepository
  });
};
