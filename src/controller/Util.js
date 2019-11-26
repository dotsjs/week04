const Instruction = require("./Instruction");
module.exports = Util = class extends Instruction {
  constructor(model) {
    super(model);
  }
  new = details => {
    console.log(details);
  };
  cd = details => {
    console.log(details);
  };
  ls = _ => {};
  touch = details => {
    console.log(details);
  };
};
