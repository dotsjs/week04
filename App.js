const Conversation = require("./src/controller/Conversation");
const Git = require("./src/controller/Git");
const Util = require("./src/controller/Util");
const Model = require("./src/model/model");

const model = new Model();
const git = new Git(model);
const util = new Util(model);
const conversation = new Conversation({ git, util });
conversation.init();
