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

  checkNow = callback => {
    if (this.nowRepository) {
      callback();
    } else {
      throw new Error("\u001b[31m레파지토리가 아닙니다\u001b[37m");
    }
  };

  newRepository = name => {
    Object.assign(this, {
      repositories: [...this.repositories, new Repository(name)]
    });
    this.view.print("\u001b[32m레파지토리 생성 완료\u001b[37m");
  };
  newFile = name => {
    this.checkNow(() => {
      this.nowRepository.head.newFile(name);
      this.view.print(`\u001b[32m${name} 파일이 생성되었습니다\u001b[37m`);
    });
  };
  editFile = name => {
    this.checkNow(() => {
      const [file] = this.nowRepository.head.getFile(name);
      if (file) {
        this.nowRepository.head.editFile(file);
        this.view.print(`\u001b[34m${name} 파일이 수정되었습니다\u001b[37m`);
      } else {
        throw new Error("\u001b[31m파일이 존재하지 않습니다\u001b[37m");
      }
    });
  };

  stagingFile = name => {
    this.checkNow(() => {
      const [file] = this.nowRepository.head.getFile(name);
      if (file) {
        if (this.nowRepository.head.inWorkingDirectory(file)) {
          this.nowRepository.head.stagingFile(file);
        }
        this.view.print(
          `\u001b[32m${name} 파일이 Staging 되었습니다\u001b[37m`
        );
      } else {
        throw new Error("\u001b[31m파일이 존재하지 않습니다\u001b[37m");
      }
    });
  };
  status = _ => {
    this.checkNow(() => {
      const head = this.nowRepository.head;
      const { workingDirectory, stagingArea, gitRepository } = head.getStatus();

      this.view.print("\u001b[34m--working-directory\u001b[37m");
      this.view.print(
        workingDirectory.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
      this.view.print("\u001b[34m--staging-area\u001b[37m");
      this.view.print(
        stagingArea.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
      this.view.print("\u001b[34m--git-repository\u001b[37m");
      this.view.print(
        gitRepository.map(({ name, date }) => `${name}\t${date}`).join("\n")
      );
    });
  };
  getRepository = name =>
    this.repositories.filter(repository => repository.name === name);

  changeRepository = name => {
    const [repository] = this.getRepository(name);
    if (repository) {
      Object.assign(this, { nowRepository: repository });
      this.view.print("\u001b[34m레파지토리 변경 완료\u001b[37m");
    } else {
      if (name) {
        throw new Error(
          "\u001b[31m해당 레파지토리가 존재하지 않습니다\u001b[37m"
        );
      } else {
        Object.assign(this, { nowRepository: null });
        this.view.print("\u001b[34m레파지토리 변경 완료\u001b[37m");
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
    this.checkNow(() => {
      const log = this.nowRepository.head.commit(message);
      this.view.print(`\u001b[36m[${log.id}] ${message}\u001b[37m`);
    });
  };
  makeBranch = name => {
    this.checkNow(() => {
      if (name) {
        this.nowRepository.makeBranch(name);
        this.view.print("\u001b[33m브랜치 생성 완료\u001b[37m");
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
    });
  };

  changeBranch = name => {
    this.checkNow(() => {
      if (name) {
        this.nowRepository.changeBranch(name);
        this.view.print("\u001b[33m브랜치 이동 완료\u001b[37m");
      } else {
        throw new Error("\u001b[32m브랜치 이름을 작성하세요\u001b[37m");
      }
    });
  };
  showLog = _ => {
    this.checkNow(() => {
      const logs = this.nowRepository.head.getLogs().reverse();
      this.view.print(
        logs
          .map(
            ({ id, message, date }) =>
              `\u001b[33mcommit ${id}\u001b[37m\n\u001b[32mDate : ${date}\u001b[37m\n${message}`
          )
          .join("\n")
      );
    });
  };

  getRemote = name => this.remotes.filter(remote => remote.name === name);
  saveRepository = _ => {
    this.checkNow(() => {
      const [remote] = this.getRemote(this.nowRepository.name);
      if (!remote) {
        Object.assign(this, {
          remotes: [...this.remotes, new Remote(this.nowRepository)]
        });
      } else {
        remote.update(this.nowRepository);
      }
      this.view.print("\u001b[32m원격저장소에 저장하였습니다\u001b[37m");
    });
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
        this.view.print(`\u001b[32m${name} 레파지토리 클론 완료\u001b[37m`);
      } else {
        throw new Error("\u001b[31m존재하지 않는 레파지토리 입니다\u001b[37m");
      }
    } else {
      throw new Error("\u001b[31m루트에서 실행하세요\u001b[37m");
    }
  };
};
