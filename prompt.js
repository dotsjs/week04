// let File = require("./file.js");
// let Commit = require("./commit.js");

let branchList = [];
let branch = 'master';
branchList.push(branch);

let repoName; //reponame

let commitList = [];
let fileList = [];

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
            // 잘라야 하는 친구들
            let strArr = answer.split(' ');
            console.log(strArr);
            

            // 터미널 명령
            if(strArr[0]=='git'&&strArr[1]=='init'){
                console.log('✨git init');
                rl.setPrompt(strArr[2]+'>');
            }
            if(strArr[0]=='cd'){
                if(strArr[1]){
                    console.log('✨cd repo');
                    repoName = strArr[1];
                    rl.setPrompt(repoName+ '/' + branch +'>');
                }else {
                    console.log('✨cd');
                    rl.setPrompt('>');
                }
            }
            if(strArr[0]=='git'&&strArr[1]=='clone'){
                let filename = 'remote/'+strArr[2]+'.json'; //file name 가져오기
            }
            


            // 통째인 친구들
        // console.log(`Recieved: ${input}`);
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
                console.log('---Staging Area---');
                let staging = fileList.filter(element => element.state == 'staging');
                for(i=0;i<staging.length;i++){console.log(staging[i].name);}

                console.log('MODIFIED FILES : ')
                let modified = fileList.filter(element => element.state == 'modified');
                for(i=0;i<staging.length;i++){console.log(modified[i].name);}

                console.log('---Unstaging Area---');
                let untracked =fileList.filter(element => element.state == 'untracked');
                for(i=0; i<untracked.length; i++){ console.log(untracked[i].name);}
            }
            if(strArr[0]=='touch'){
                const found =fileList.find(element => element.name == strArr[1]);
                found.state = 'modified'; // state : staging 로 변경
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
            }


            if(answer == 'exit') rl.close();
            rl.prompt();
        });


        rl.on('close', function () {process.exit();})
}
