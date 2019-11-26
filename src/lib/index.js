const checkNow = (now, callback) => {
  if (now) {
    callback();
  } else {
    throw new Error("\u001b[31m레파지토리가 아닙니다\u001b[37m");
  }
};

const isSameFile = (fileA, fileB) => {
  const { name, date, state } = fileA;
  if (fileB.name === name && fileB.date === date && fileB.state === state) {
    return true;
  }
  return false;
};

const fs = require("fs");

const saveFile = (name, head) => {
  const content = JSON.stringify(
    Object.assign(
      {},
      {
        workingDirectory: head.workingDirectory,
        stagingArea: head.stagingArea,
        gitRepository: head.gitRepository,
        logs: head.logs
      }
    )
  );
  try {
    fs.writeFileSync(`remote/${name}.json`, content);
  } catch (e) {
    throw new Error(e);
  }
};

const readFile = name => {
  try {
    const data = fs.readFileSync(`remote/${name}.json`);
    return data;
  } catch {
    return null;
  }
};

module.exports = { checkNow, isSameFile, saveFile, readFile };
