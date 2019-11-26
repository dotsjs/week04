const readline = require("readline");

module.exports = Conversation = class {
  constructor(instruction) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    Object.assign(this, { rl, instruction });
  }

  init = _ => {
    this.rl.question("/> ", this.callback);
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
        const { nowRepository } = this.instruction.model;
        const repository = nowRepository && nowRepository.name;
        const branch = nowRepository && nowRepository.head.name;
        this.rl.question(
          `${repository ? repository : ""}/${branch ? branch : ""}> `,
          this.callback
        );
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
        this.instruction.init(details);
        break;
      case "clone":
        this.instruction.clone(details);
        break;
      case "add":
        this.instruction.add(details);
        break;
      case "commit":
        this.instruction.commit(details);
        break;
      case "status":
        this.instruction.status(details);
        break;
      case "log":
        this.instruction.log(details);
        break;
      case "branch":
        this.instruction.branch(details);
        break;
      case "checkout":
        this.instruction.checkout(details);
        break;
      case "push":
        this.instruction.push(details);
        break;
      default:
        throw new Error("\u001b[31m잘못된 명령입니다.\u001b[37m");
    }
  };

  utilFunc = (type, details) => {
    switch (type) {
      case "new":
        this.instruction.new(details);
        break;
      case "cd":
        this.instruction.cd(details);
        break;
      case "ls":
        this.instruction.ls(details);
        break;
      case "touch":
        this.instruction.touch(details);
        break;
      default:
        throw new Error("\u001b[31m잘못된 명령입니다.\u001b[37m");
    }
  };
};
