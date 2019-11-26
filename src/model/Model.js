const Repository = require("./Repository");
module.exports = Model = class {
  constructor(view) {
    Object.assign(this, {
      repositories: [],
      view
    });
  }
  newRepository = name => {
    Object.assign(this, {
      repositories: [...this.repositories, new Repository(name)]
    });
    this.view.print("레파지토리 생성 완료");
  };
  list = _ => {
    this.view.print(this.repositories.map(({ name }) => name).join("\n"));
  };
};
