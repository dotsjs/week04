const fs = require("fs");

function init(repositoryName){
  let content = {
    curBranch: 'master',
    branchList: ['master'],
  }
  fs.writeFileSync(`./remote/${repositoryName}.json`, JSON.stringify(content), err => {
    if (err) return console.log(err);
  });
}

function gitParsing(cmd){
  let arr = cmd.split(' ');
  if(arr && arr.length === 3 && arr[0] ==='git' && arr[1] === 'init'){
    init(arr[2]);
  }
}

module.exports.gitParsing = gitParsing;