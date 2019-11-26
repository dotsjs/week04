const fs = require("fs");
module.exports = Remote = class {
  constructor({ name, head, branchList }) {
    Object.assign(this, {
      name,
      head,
      branchList
    });
    this.saveFile(name, head);
  }

  static getClone = name => {
    const data = this.readFile(name);
    if (data) {
      const repository = JSON.parse(data.toString());
      return {
        name,
        ...repository
      };
    }
    return null;
  };

  static readFile = name => {
    try {
      const data = fs.readFileSync(`remote/${name}.json`);
      return data;
    } catch {
      return null;
    }
  };

  saveFile = (name, head) => {
    const content = JSON.stringify(
      Object.assign(
        {},
        {
          workingDirectory: head.workingDirectory,
          stagingArea: head.stagingArea,
          gitRepository: head.gitRepository,
          logs: head.logs
        }
      )
    );
    try {
      fs.writeFileSync(`remote/${name}.json`, content);
    } catch (e) {
      throw new Error(e);
    }
  };
};
