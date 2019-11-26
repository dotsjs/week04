module.exports = Instruction = class {
  constructor(model) {
    Object.assign(this, { model });
  }
  ls = _ => this.model.list();
  new = ([name]) => this.model.newFile(name);
  cd = ([name]) => this.model.changeRepository(name);
  touch = ([name]) => this.model.editFile(name);

  status = _ => this.model.status();
  log = _ => this.model.showLog();
  init = ([name]) => this.model.newRepository(name);
  clone = details => {};
  add = ([name]) => this.model.stagingFile(name);
  commit = ([message]) => this.model.commit(message);
  branch = ([name]) => this.model.makeBranch(name);
  checkout = ([name]) => this.model.changeBranch(name);
  push = details => {};
};
