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

  status = _ => {};
  log = _ => {};
  init = ([name]) => {
    this.model.newRepository(name);
  };
  clone = details => {};
  add = details => {};
  commit = details => {};
  branch = details => {};
  checkout = details => {};
  push = details => {};
};
