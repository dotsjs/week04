module.exports = File = class {
  constructor(name) {
    Object.assign(this, {
      name,
      state: "Untracked",
      date: new Date()
        .toJSON()
        .replace("T", " ")
        .slice(0, -5)
    });
  }

  setState = state =>
    Object.assign(this, {
      state,
      date: new Date()
        .toJSON()
        .replace("T", " ")
        .slice(0, -5)
    });
};
