const Instruction = require("./Instruction");
module.exports = Util = class extends Instruction {
  constructor(model) {
    super(model);
  }
  ls = _ => {};
  new = details => {
    console.log(details);
  };
  cd = details => {
    console.log(details);
  };
  touch = details => {
    console.log(details);
  };
};
