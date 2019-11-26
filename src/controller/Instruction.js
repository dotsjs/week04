module.exports = Instruction = class {
  constructor(model) {
    Object.assign(this, { model });
  }
  ls = _ => this.model.list();
  new = ([name]) => this.model.newFile(name);
  cd = ([name]) => this.model.changeRepository(name);
  touch = details => {
    console.log(details);
  };

  status = _ => this.model.status();
  log = _ => {};
  init = ([name]) => {
    this.model.newRepository(name);
  };
  clone = details => {};
  add = ([name]) => this.model.stagingFile(name);
  commit = details => {};
  branch = details => {};
  checkout = details => {};
  push = details => {};
};
