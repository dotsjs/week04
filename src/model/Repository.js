const Branch = require("./Branch");
module.exports = Repository = class {
  constructor(name, remote) {
    let head;
    if (remote) {
      head = new Branch("master", remote);
    } else {
      head = new Branch("master");
    }
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
      throw new Error("이미 존재하는 브랜치 입니다");
    }
  };
  changeBranch = name => {
    const [branch] = this.getBranch(name);
    if (branch) {
      Object.assign(this, { head: branch });
    } else {
      throw new Error("없는 브랜치 입니다");
    }
  };
  getBranch = name => this.branchList.filter(branch => branch.name === name);
  getBranches = _ => this.branchList;
};
