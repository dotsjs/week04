const Repository = require("./Repository");
module.exports = Model = class {
  constructor(view) {
    Object.assign(this, {
      repositories: [],
      nowRepository: null,
      view
    });
  }
  newRepository = name => {
    Object.assign(this, {
      repositories: [...this.repositories, new Repository(name)]
    });
    this.view.print("레파지토리 생성 완료");
  };
  newFile = name => {};

  getRepository = name =>
    this.repositories.filter(repository => repository.name === name);
  changeRepository = name => {
    const [repository] = this.getRepository(name);
    if (repository) {
      Object.assign(this, { nowRepository: repository });
      this.view.print("레파지토리 변경 완료");
    } else {
      if (name) {
        throw new Error("해당 레파지토리가 존재하지 않습니다");
      } else {
        Object.assign(this, { nowRepository: null });
        this.view.print("레파지토리 변경 완료");
      }
    }
  };
  list = _ => {
    this.view.print(this.repositories.map(({ name }) => name).join("\n"));
  };
};
