const fs = require('fs');

fs.readFileSync(`./${repositoryName}.json`);

fs.writeFileSync(`./${repositoryName}.json`, content, err => {
    if (err) return console.log(err);
  });