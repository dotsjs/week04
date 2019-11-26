const Branch = require("./Branch");
module.exports = Repository = class {
  constructor(name, remote) {
    const head = remote ? new Branch("master", remote) : new Branch("master");
    Object.assign(this, {
      name,
      head,
      branchList: [head]
    });
  }
  makeBranch = name => {
    const [branch] = this.getBranch(name);
    if (!branch) {
      const newBranch = new Branch(name, this.head);
      Object.assign(this, { branchList: [...this.branchList, newBranch] });
    } else {
      throw new Error("\u001b[31m이미 존재하는 브랜치 입니다\u001b[37m");
    }
  };
  changeBranch = name => {
    const [branch] = this.getBranch(name);
    if (branch) {
      Object.assign(this, { head: branch });
    } else {
      throw new Error("\u001b[31m존재하지 않는 브랜치 입니다\u001b[37m");
    }
  };
  getBranch = name => this.branchList.filter(branch => branch.name === name);
  getBranches = _ => this.branchList;
};
