const EventEmitter = require("events");

const Bar = class extends EventEmitter {
  constructor() {
    super();
    this.on("start", () => {
      console.log("시작");
    });
    this.on("end", data => {
      console.log(data + " 종료 후");
    });
  }
};

function foo(callback, bar) {
  return setTimeout(() => {
    callback("foo 종료");
    bar.emit("end", "foo");
  }, 2000);
}

function main() {
  const bar = new Bar();
  bar.emit("start");
  foo(console.log, bar);
  console.log("main 종료");
}

main();
