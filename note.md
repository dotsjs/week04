# week 04

# 가상 GIT 구현

## 기본 셋팅

1. node 설치(homebrew 이용)

`brew install node`  : 브루이용하여 노드 설치

`node -v` : nodejs 버젼 확인

2. 대화형 프로그램이 셋팅

#app.js 파일 생성 후 아래의 내용 추가

    const readline = require(“readline”); // 입력을 받는 모듈



---


# Module
캡슐화하는것을 말하며, 구현 세부 사항을 캡슐화하여 필요한 파일만을 import 해와 사용함으로써 유지보수, 보안, 효율성을 높인다.

ES6에서 자바스크립트에서 동작하는 `Module`기능을 추가했다!
각각의 Module은 독립적인 파일 scope를 가지고 있기 때문에 Module안에 선언된 것은 해당 모듈 내부에서만 사용 가능하다. 하지만 외부에서 사용할 수 있도록 `export`, `import`를 제공한다.

## export
```
export const sq = Math.sqrt(2);

export function square(x) { return x*x; }

export class Student{
    constructor(name){
        this.name = name;
    }
}
```
또는 
```
export { sq, square, Student }
```


## import
```
import { sq, square, Student } from './data';
```

이름 변경하여 import

```
import { sq as squareResult,
         square as squareFunction,
         Student as Std
} from './test';
```

전체 모두 하나의 이름으로 import

```
import * as data from './data';

console.log(data.square(2));
console.log(new data.Student(2999));
```

## module.exports vs exports 
CommonJS와 ES6의 차이이다. `import {} from '';` ES6문법을 사용하기 위해서는 node.js 설정을 별개로 해주어야 한다. 
```
var module = { exports : {} };
var exports = module.exports;

return module.exports;
```


```
module.exports = {
    File: class{
        constructor(name){
            this.state = 'untracked'; // default : untracked
            this.name = name;
        }
    }
}

module.exports = File = class {

}

module.exports = class File {
    
}
```