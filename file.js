// file class
module.exports = {
    File: class{
        constructor(name){
            this.state = 'untracked'; // default : untracked
            this.name = name;
        }
    }
}
