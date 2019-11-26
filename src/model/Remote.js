const { saveFile, readFile } = require("../lib");

module.exports = Remote = class {
  constructor({ name, head, branchList }) {
    Object.assign(this, {
      name,
      head,
      branchList
    });
    saveFile(name, head);
  }

  static getClone = name => {
    const data = readFile(name);
    if (data) {
      const repository = JSON.parse(data.toString());
      return {
        name,
        ...repository
      };
    }
    return null;
  };
};
