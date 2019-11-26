const Repository = require("./Repository");
module.exports = Model = class {
  constructor() {
    Object.assign(this, {
      repositories: []
    });
  }
  newRepository = name =>
    Object.assign(this, {
      repositories: [...this.repositories, new Repository(name)]
    });
  list = _ => this.repositories.map(({ name }) => name);
};
