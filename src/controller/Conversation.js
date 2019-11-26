const readline = require("readline");

module.exports = Conversation = class {
  constructor({ git, util }) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    Object.assign(this, { rl, git, util, head: ["", ""] });
  }

  init = _ => {
    this.rl.question(this.head.join("/") + "> ", this.callback);
  };

  callback = answer => {
    if (answer === "exit") {
      console.log("\u001b[32m(프로그램 종료)\u001b[37m");
      this.rl.close();
    } else {
      try {
        this.execution(answer);
      } catch (e) {
        console.log(e.message);
      } finally {
        this.rl.question(this.head.join("/") + "> ", this.callback);
      }
    }
  };

  execution = instruction => {
    const [type, ...details] = instruction.split(" ");
    if (this.isGitFunc(type)) {
      this.gitFunc(details);
    } else {
      this.utilFunc(type, details);
    }
  };

  isGitFunc = token => token === "git";

  gitFunc = ([type, ...details]) => {
    switch (type) {
      case "init":
        break;
      case "clone":
        break;
      case "add":
        break;
      case "commit":
        break;
      case "status":
        break;
      case "log":
        break;
      case "branch":
        break;
      case "checkout":
        break;
      case "push":
        break;
      default:
        throw new Error("\u001b[31m잘못된 명령입니다.\u001b[37m");
    }
    console.log(type);
    console.log(details);
  };

  utilFunc = (type, details) => {
    switch (type) {
      case "new":
        this.util.new(details);
        break;
      case "cd":
        this.util.cd(details);
        break;
      case "ls":
        this.util.ls(details);
        break;
      case "touch":
        this.util.touch(details);
        break;
      default:
        throw new Error("\u001b[31m잘못된 명령입니다.\u001b[37m");
    }
  };
};
