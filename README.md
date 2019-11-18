# 가상 GIT

분산 버전 관리 시스템인 git을 직접 구현해본다.

https://git-scm.com/book/ko/v2

이번 과제는 객체지향을 활용해 프로젝트를 설계하고 구현하는 데에 목표가 있습니다.

1. 프로그램 설계하기  
   데이터의 흐름을 그림으로 표현합니다.
2. 스켈레톤 코드 작성하기  
   실제 프로그램을 작성하기 전 간단하게 전체 구조만 코드로 작성합니다.
3. 모듈화 적용하기  
   하나의 파일에서 작성하는 것이 아닌 실제 구동시킬 파일 App.js와 class단위로 파일을 모듈화합니다.
4. 대화형 프로그래밍  
   Node환경에서 앱을 실행한 뒤 CLI환경에서 앱이 작동하도록 합니다.
5. 예외 처리  
   어떠한 입력에서도 프로그램이 죽지 않도록 관리합니다.

### 대화형 프로그래밍

터미널에서 입력을 받을 수 있는 모듈을 import합니다.

```javascript
const readline = require("readline");
```

기본세팅

```javascript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
```

입력을 받을 때 사용하는 비동기 메소드

> rl.question(String: 화면에 나타날 문구, Function: 입력이 끝난 후 입력받은 데이터가 인자로 전달되는 함수)

```javascript
rl.question(">", callback);
```

대화 종료

```javascript
rl.close();
```

### 파일 입출력

파일을 입출력 할 수 있는 모듈을 import합니다.

```javascript
const fs = require("fs");
```

remote폴더에서 원하는 파일을 읽어옵니다.

```javascript
fs.readFileSync(`./remote/${repositoryName}.json`);
```

원하는 파일에 내용을 저장합니다.

```javascript
fs.writeFileSync(`./remote/${repositoryName}.json`, content, err => {
  if (err) return console.log(err);
});
```

### 필수 구현 사항

- App.js는 import와 객체를 생성하는 코드를 제외하고 한 줄을 넘기지 않습니다.

- es6의 classes문법을 활용합니다.

git을 구현할 때 실제 파일이나 폴더가 생성되는 것이 아닌 데이터만 추상화해서 만들면 됩니다. remote 저장소의 경우 json이 저장된 파일 생성

- git init `<레파지토리 이름>`  
  레파지토리가 생성됩니다. 최초 브랜치 `master`  
  대화창 `>` 에서만 사용가능
- cd `<레파지토리 이름>`  
   해당 레파지토리에 진입
  대화창 `>` 에서 사용 후 `레파지토리이름/브랜치이름>` 으로 변경
- cd  
   레파지토리에서 벗어납니다. 대화창 `>` 로 변경
- git clone `<레파지토리 이름>`
  `remote/레파지토리이름.json`의 내용을 가져옵니다. 레파지토리가 생성됩니다.  
  대화창 `>` 에서만 사용가능
- ls  
  대화창 `>` 에서 사용 시 레파지토리 리스트가 나타납니다.  
  대화창 `레파지토리이름/브랜치이름>` 에서 사용 시 파일 리스트가 나타납니다.

아래부터 대화창 `>` 에서는 사용 불가능

- new `<파일 이름>`  
   파일을 생성합니다.
- git add `<파일 이름>`  
  해당 파일의 상태를 변경합니다.
- git commit `<커밋 메세지>`  
  메세지가 작성된 시점의 시각과 메세지를 로그에 기록합니다.
- git status  
  Working Directory, Staging Area, Git Repository 에 존재하는 파일 리스트를 각 각 표시합니다.
- touch `<파일 이름>`  
  해당 파일이 수정됩니다
- git log  
  현재까지의 커밋로그가 나타납니다
- git branch  
  브랜치 리스트가 나타납니다. 현재 브랜치 표시
- git branch `<브랜치 이름>`  
  새로운 브랜치 생성
- git checkout `<브랜치 이름>`
  해당 브랜치로 이동합니다.  
  대화창 `레파지토리이름/브랜치이름>` 변경
- git push `<레파지토리 이름>`  
  `remote/레파지토리 이름.json`이라는 폴더를 생성하고 현재까지의 커밋로그를 파일에 저장합니다.
