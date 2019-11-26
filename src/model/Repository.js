const Branch = require("./Branch");
module.exports = Repository = class {
  constructor(name) {
    Object.assign(this, {
      name,
      head: new Branch("master"),
      branchList: [this.head]
    });
  }
  newBranch = name => new Branch(name, this.head);
  checkout = name => {
    const [branch] = this.branchList.filter(branch => branch.name === name);
    Object.assign(this, { head: branch });
  };
};
