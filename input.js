const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function prompt(cb) {
  rl.setPrompt('>');
  rl.prompt();
  rl.on('line', function(line){
    if(line =='exit'){
      rl.close();
    }
    cb(line);
    rl.prompt();
  });

  rl.on('close', function(){
    process.exit();
  });
}

module.exports.prompt = prompt;