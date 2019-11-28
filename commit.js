module.exports = {
   Commit: class{
        constructor(name){
            this.name = name;
            var date = new Date();
            this.date = date.toString();   
            this.file = []; //원래 파일도 같이 들어가야된다고 생각했는데
        }
    }
}

    // Repository: class{
    //     constructor(){
    //         this.commitList = [];
    //     }
    // }