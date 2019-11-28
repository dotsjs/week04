
// let File = require("./file.js");
// let Commit = require("./commit.js");
//let prompt = require("./prompt.js");


let branchList = [];
let branch = 'master';
branchList.push(branch);

let repoName=''; //reponame

let commitList = [];
let fileList = [];


class Commit{
    constructor(name){
        this.name = name;
        var date = new Date();
        this.date = date.toString();   
        // this.file = []; //원래 파일도 같이 들어가야된다고 생각했는데
    }
}

class File{
    constructor(name){
        this.state = 'untracked'; // default : untracked
        this.name = name;
    }
}

const readline = require("readline"); // 터미널에서 입력 받는 모듈 import 

const rl = readline.createInterface({ // 입력받을 떄 사용하는 비동기 메시지
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
PromptStart();
function PromptStart () {
        rl.setPrompt('>');
        rl.prompt();
        rl.on('line', (answer) => {
            // 명령어 처리를 위한 split
            let strArr = answer.split(' ');

            // 터미널 명령
            if(strArr[0]=='git'&&strArr[1]=='init'){
                console.log('✨git init');
                repoName = strArr[2];
                // rl.setPrompt(strArr[2]+'>');
            }
            if(strArr[0]=='cd'){
                if(strArr[1]){
                    console.log('✨cd repo');
                    rl.setPrompt(repoName+ '/' + branch +'>');
                }else {
                    console.log('✨cd');
                    rl.setPrompt('>');
                }
            }
            if(strArr[0]=='git'&&strArr[1]=='clone'){
                let filename = 'remote/'+strArr[2]+'.json'; 
                //file name 가져오기
            }
            


        if(strArr[0]=='new'){
                fileList.push(new File(strArr[1]));
                console.log(fileList);
            }
        if(strArr[0]=='git'&&strArr[1] == 'add'){
                const found =fileList.find(element => element.name == strArr[2]);
                found.state = 'staging'; // state : staging 로 변경
                console.log(strArr[2] + ' state is changed ' + found.state);
            }
            if(strArr[0]=='git'&&strArr[1]=='commit'){
                commitList.push(new Commit(strArr[2]));
                console.log(strArr[2] + ' commit success!')
            }
            if(strArr[0]=='git'&&strArr[1]=='status'){
                console.log('STAGING FILES :');
                let staging = fileList.filter(element => element.state == 'staging');
                for(i=0;i<staging.length;i++){console.log("       "+staging[i].name);}

                console.log('MODIFIED FILES : ')
                let modified = fileList.filter(element => element.state == 'modified');
                for(i=0;i<staging.length;i++){console.log("       "+modified[i].name);}

                console.log('UNTRACKED FILES : ');
                let untracked =fileList.filter(element => element.state == 'untracked');
                for(i=0; i<untracked.length; i++){ console.log("       "+untracked[i].name);}
            }
            if(strArr[0]=='touch'){
                const found =fileList.find(element => element.name == strArr[1]);
                found.state = 'modified';
                console.log(strArr[1] + ' state is changed ' + found.state);
            }
            if(strArr[0]=='git'&&strArr[1]=='log'){
                // 여기서 커밋한 파일들 정보 가지고있어야하쥐않나여 파일 배열로라둥.
                console.log(commitList);
            }
            if(strArr[0]=='git'&&strArr[1]=='branch'){
                if(strArr.length == 2){
                    console.log(branchList);
                }else {
                    branch = strArr[2];
                    branchList.push(branch);
                    console.log('✨success new branch '+ branch);
                }
            }
            if(strArr[0]=='git'&&strArr[1]=='checkout'){
                if(branchList.find(element => element==strArr[2])){
                    branch = strArr[2];
                    console.log(branchList);
                    rl.setPrompt(repoName+ '/' + branch +'>');
                }else {
                    console.log('you can\'t checkout '+strArr[2]+' !!!');
                }
            }
            if(strArr[0]=='git'&&strArr[1]=='push'){
                // 'remote/'+repoName+'.json' 이라는 폴더 생성하고 현재까지의 커밋 로그를 파일에 저장한다
                // localStorage.setItem(Commit.list, JSON.stringify(toDos));
            }


            if(answer == 'exit') rl.close();
            rl.prompt();
        });


        rl.on('close', function () {process.exit();})
}
