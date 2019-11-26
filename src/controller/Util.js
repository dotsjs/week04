const Instruction = require("./Instruction");
module.exports = Util = class extends Instruction {
  constructor(model) {
    super(model);
  }
  ls = _ => {};
  new = ([name]) => {
    const file = new this.model.File(name);
    console.log(file);
  };
  cd = details => {
    console.log(details);
  };
  touch = details => {
    console.log(details);
  };
};
