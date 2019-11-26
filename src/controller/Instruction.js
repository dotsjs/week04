module.exports = Instruction = class {
  constructor(model) {
    Object.assign(this, { model });
  }
  ls = _ => {
    console.log(this.model.list());
  };
  new = ([name]) => {};
  cd = details => {
    console.log(details);
  };
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
