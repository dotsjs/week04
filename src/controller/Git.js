const Instruction = require("./Instruction");
module.exports = Git = class extends Instruction {
  constructor(model) {
    super(model);
  }
  status = _ => {};
  log = _ => {};
  init = details => {};
  clone = details => {};
  add = details => {};
  commit = details => {};
  branch = details => {};
  checkout = details => {};
  push = details => {};
};
