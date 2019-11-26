const fs = require("fs");
module.exports = Remote = class {
  constructor({ name, head }) {
    Object.assign(this, {
      name,
      branch: {
        [head.name]: head
      }
    });
    this.saveFile(name, head);
  }

  readFile = name => {
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
    fs.writeFileSync(`remote/${name}.json`, content, err => {
      if (err) throw new Error(err);
    });
  };
};
