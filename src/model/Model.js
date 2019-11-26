const Repository = require("./Repository");
const Remote = require("./Remote");
module.exports = Model = class {
  constructor(view) {
    Object.assign(this, {
      repositories: [],
      remotes: [],
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
  editFile = name => {
    if (this.nowRepository) {
      const [file] = this.nowRepository.head.getFile(name);
      if (file) {
        this.nowRepository.head.editFile(file);
        this.view.print(name + " 파일이 수정되었습니다");
      } else {
        throw new Error("파일이 존재하지 않습니다.");
      }
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };

  stagingFile = name => {
    if (this.nowRepository) {
      const [file] = this.nowRepository.head.getFile(name);
      if (file) {
        if (this.nowRepository.head.inWorkingDirectory(file)) {
          this.nowRepository.head.stagingFile(file);
        }
        this.view.print(name + " 파일이 Staging 됨");
      } else {
        throw new Error("파일이 존재하지 않습니다");
      }
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };
  status = _ => {
    if (this.nowRepository) {
      const head = this.nowRepository.head;
      const { workingDirectory, stagingArea, gitRepository } = head.getStatus();

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
      const fileList = files
        .map(({ name, state, date }) => `${name}\t${state}\t${date}`)
        .join("\n");
      this.view.print(fileList);
    } else {
      this.view.print(this.repositories.map(({ name }) => name).join("\n"));
    }
  };
  commit = message => {
    if (this.nowRepository) {
      const log = this.nowRepository.head.commit(message);
      this.view.print(`[${log.id}] ${message}`);
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };
  makeBranch = name => {
    if (this.nowRepository) {
      if (name) {
        this.nowRepository.makeBranch(name);
        this.view.print("브랜치 생성 완료");
      } else {
        const branches = this.nowRepository.getBranches();
        this.view.print(
          branches
            .map(({ name }) =>
              this.nowRepository.head.name === name ? `* ${name}` : name
            )
            .join("\n")
        );
      }
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };

  changeBranch = name => {
    if (this.nowRepository) {
      if (name) {
        this.nowRepository.changeBranch(name);
        this.view.print("브랜치 이동 완료");
      } else {
        throw new Error("브랜치 이름을 작성하세요");
      }
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };
  showLog = _ => {
    if (this.nowRepository) {
      const logs = this.nowRepository.head.getLogs().reverse();
      this.view.print(
        logs
          .map(
            ({ id, message, date }) =>
              `commit ${id}\nDate : ${date}\n${message}`
          )
          .join("\n")
      );
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };

  getRemote = name => this.remotes.filter(remote => remote.name === name);
  saveRepository = _ => {
    if (this.nowRepository) {
      const [remote] = this.getRemote(this.nowRepository.name);
      if (!remote) {
        Object.assign(this, {
          remotes: [...this.remotes, new Remote(this.nowRepository)]
        });
      } else {
        remote.update(this.nowRepository);
      }
    } else {
      throw new Error("레파지토리가 아닙니다");
    }
  };
  loadRepository = name => {
    if (this.nowRepository === null) {
      const remote = Remote.getClone(name);
      if (remote) {
        Object.assign(this, {
          repositories: [
            ...this.repositories,
            new Repository(remote.name, remote)
          ]
        });
        this.view.print(name + " 레파지토리 클론 완료");
      } else {
        throw new Error("없는 레파지토리 입니다");
      }
    } else {
      throw new Error("루트에서 실행하세요");
    }
  };
};
