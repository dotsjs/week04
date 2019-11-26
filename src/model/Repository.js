const Branch = require("./Branch");
module.exports = Repository = class {
  constructor(name) {
    const head = new Branch("master");
    Object.assign(this, {
      name,
      head,
      branchList: [head]
    });
  }
  makeBranch = name => {
    const newBranch = new Branch(name, this.head);
    Object.assign(this, { branchList: [...this.branchList, newBranch] });
  };
  getBranches = _ => this.branchList;
  checkout = name => {
    const [branch] = this.branchList.filter(branch => branch.name === name);
    Object.assign(this, { head: branch });
  };
};
