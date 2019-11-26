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
  newFile = name => {
    if (this.nowRepository) {
      this.nowRepository.head.newFile(name);
      this.view.print(name + " 파일이 생성되었습니다");
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };

  status = _ => {
    if (this.nowRepository) {
      const head = this.nowRepository.head;
      const { workingDirectory, stagingArea, gitRepository } = head.getFiles();

      this.view.print("working-directory");
      this.view.print(
        workingDirectory.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
      this.view.print("staging-area");
      this.view.print(
        stagingArea.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
      this.view.print("git-repository");
      this.view.print(
        gitRepository.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };
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
    if (this.nowRepository) {
      const files = this.nowRepository.head.getFiles();
      const fileList = Object.values(files)
        .flat()
        .map(({ name, state, date }) => `${name}\t${state}\t${date}`);
      this.view.print(fileList.join("\n"));
    } else {
      this.view.print(this.repositories.map(({ name }) => name).join("\n"));
    }
  };
};
