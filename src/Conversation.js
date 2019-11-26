const readline = require("readline");

module.exports = Conversation = class {
  constructor(model) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    Object.assign(this, { rl, model, head: ["", ""] });
  }

  init = _ => {
    this.rl.question(this.head.join("/") + ">", this.callback);
  };

  callback = answer => {
    if (answer == "exit") {
      console.log("\u001b[32m(프로그램 종료)\u001b[37m");
      this.rl.close();
    } else {
      try {
        this.execution(answer);
      } catch (e) {
        console.log(e.message);
      } finally {
        this.rl.question(this.head.join("/") + ">", this.callback);
      }
    }
  };

  execution = answer => {
    console.log(answer);
  };
};
