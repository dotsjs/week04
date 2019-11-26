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

function cdWithoutParam(){
  return '';
}

function gitClone(repositoryName){
  let content = fs.readFileSync(`./remote/${repositoryName}.json`, 'utf8');
  fs.writeFileSync(`./${repositoryName}.json`, content, err => {
    if (err) return console.log(err);
  });
  console.log(content);
}

function ls(){
  let files = fs.readdirSync('./');
  for(let i=0; i<files.length; i++){
    if(files[i].endsWith('.json')){
      console.log(files[i].split('.')[0]);
    }
  }
}

function gitParsing(cmd){
  let arr = cmd.split(' ');
  if(arr && arr.length === 3 && arr[0] ==='git' && arr[1] === 'init'){
    init(arr[2]);
  }
  else if (arr && arr.length === 2 && arr[0] === 'cd'){
    return cdWithParam(arr[1]);
  }
  else if (arr && arr.length === 1 && arr[0] === 'cd'){
    return cdWithoutParam();
  }
  else if (arr && arr.length === 3 && arr[0] === 'git' && arr[1] === 'clone'){
    return gitClone(arr[2]);
  }
  else if (arr && arr.length === 1 && arr[0] === 'ls'){
    return ls(arr[0]);
  }
}

module.exports.gitParsing = gitParsing;