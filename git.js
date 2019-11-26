const fs = require("fs");

function init(repositoryName){
  let content = {
    curBranch: 'master',
    branchList: ['master'],
  }
  fs.writeFileSync(`./${repositoryName}.json`, JSON.stringify(content), err => {
    if (err) return console.log(err);
  });
}

function cdWithParam(repositoryName){
  let content = fs.readFileSync(`./${repositoryName}.json`, 'utf8');
  console.log(content);
  let curBranch = JSON.parse(content).curBranch;
  return `${repositoryName}/${curBranch}`;
}

function gitParsing(cmd){
  let arr = cmd.split(' ');
  if(arr && arr.length === 3 && arr[0] ==='git' && arr[1] === 'init'){
    init(arr[2]);
  }
  else if (arr && arr.length === 2 && arr[0] === 'cd'){
    return cdWithParam(arr[1]);
  }
}

module.exports.gitParsing = gitParsing;