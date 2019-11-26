const File = require("./File");
const Log = require("./Log");
const { isSameFile } = require("../lib");
module.exports = Branch = class {
  constructor(
    name,
    parent = { workingDirectory: [], stagingArea: [], gitRepository: [] }
  ) {
    const { workingDirectory, stagingArea, gitRepository } = parent;
    // deep copy 필요
    Object.assign(this, {
      name,
      parent,
      workingDirectory,
      stagingArea,
      gitRepository,
      logs: []
    });
  }

  getLogs = _ => this.logs;

  commit = message => {
    const log = new Log(message);
    Object.assign(this, {
      stagingArea: [],
      gitRepository: [...this.gitRepository, ...this.stagingArea],
      logs: [...this.logs, log]
    });

    return log;
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
          expect => !isSameFile(file, expect)
        ),
        gitRepository: this.gitRepository.filter(
          expect => !isSameFile(file, expect)
        )
      });
    }
  };
  stagingFile = file => {
    file.setState("Staged");
    Object.assign(this, {
      workingDirectory: this.workingDirectory.filter(
        expect => !isSameFile(file, expect)
      ),
      stagingArea: [...this.stagingArea, file]
    });
  };

  inWorkingDirectory = file =>
    this.workingDirectory.some(expect => isSameFile(file, expect));

  getFile = name => this.getFiles().filter(file => file.name === name);

  getFiles = _ => Object.values(this.getStatus()).flat();

  getStatus = _ => ({
    workingDirectory: this.workingDirectory,
    stagingArea: this.stagingArea,
    gitRepository: this.gitRepository
  });
};
